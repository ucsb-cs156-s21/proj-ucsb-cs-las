package edu.ucsb.ucsbcslas.controllers;

import edu.ucsb.ucsbcslas.entities.AppUser;
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

import javax.validation.Valid;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorNotes;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.OnlineOfficeHoursRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorNotesRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;

@RestController
public class TutorNotesController {
    private final Logger logger = LoggerFactory.getLogger(TutorNotesController.class);

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private TutorNotesRepository tutorNotesRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private TutorAssignmentRepository tutorAssignmentRepository;
    @Autowired
    private OnlineOfficeHoursRepository onlineOfficeHoursRepository;

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    // private ResponseEntity<String> getIncorrectInputResponse() throws JsonProcessingException {
    //     Map<String, String> response = new HashMap<String, String>();
    //     response.put("error", String
    //             .format("Misformatted Input; Check that the tutor email that was input is assigned to a valid tutor"));
    //     String body = mapper.writeValueAsString(response);
    //     return new ResponseEntity<String>(body, HttpStatus.BAD_REQUEST);
    // }

    @PostMapping(value = "/api/member/tutorNotes", produces = "application/json")
    public ResponseEntity<String> createTutorNotes(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid String tutorNotes) throws JsonProcessingException {
        if (!authControllerAdvice.getIsMember(authorization)) {
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }

        String currentUserEmail = authControllerAdvice.getUser(authorization).getEmail();

        List<OnlineOfficeHours> onlineOfficeHours = onlineOfficeHoursRepository
                .findByTutorAssignmentTutorEmail(currentUserEmail);

        JSONObject tutorNotesAsJson = new JSONObject(tutorNotes);
        logger.info("tutorNotesAsJson= {}",tutorNotesAsJson);
        JSONObject officeHoursAsJson = new JSONObject(tutorNotesAsJson.get("onlineOfficeHours").toString());
        logger.info("officeHoursAsJson= {}",officeHoursAsJson);
        Long officeHoursId = officeHoursAsJson.getLong("id");
        logger.info("officeHoursId= {}",officeHoursId);
        Stream<OnlineOfficeHours> filtered = onlineOfficeHours.stream().filter(ooh -> ooh.getId() == officeHoursId);
        logger.info("filtered= {}",filtered);

        if (filtered.count() == 0) {
            return new ResponseEntity<>(
                    "Unauthorized Request: Email of current user does not match email of office hours selected",
                    HttpStatus.UNAUTHORIZED);
        }

        Optional<OnlineOfficeHours> ooh = onlineOfficeHoursRepository.findById(officeHoursId);
        logger.info("ooh= {}",ooh);
        TutorNotes newNotes = new TutorNotes();
        newNotes.setOnlineOfficeHours(ooh.get());
        newNotes.setMessage(tutorNotesAsJson.getString("message"));

        logger.info("newNotes= {}", newNotes);
        TutorNotes savedTutorNotes = tutorNotesRepository.save(newNotes);
        String body = mapper.writeValueAsString(savedTutorNotes);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/tutorNotes", produces = "application/json")
    public ResponseEntity<String> getTutorNotes(@RequestHeader("Authorization") String authorization)
            throws JsonProcessingException {
        List<TutorNotes> tutorNotesList = null;
        if (!authControllerAdvice.getIsMember(authorization)) {
            return new ResponseEntity<>("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
        String thisUsersEmail = authControllerAdvice.getUser(authorization).getEmail();
        if (authControllerAdvice.getIsAdmin(authorization)) {
            tutorNotesList = tutorNotesRepository.findAll();

        } else {
            tutorNotesList = tutorNotesRepository
                    .findAllByOnlineOfficeHoursTutorAssignmentCourseInstructorEmail(thisUsersEmail);
        }

        List<TutorNotes> tutorNotes = tutorNotesRepository
                .findAllByOnlineOfficeHoursTutorAssignmentTutorEmail(thisUsersEmail);
        tutorNotesList.addAll(tutorNotes);

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorNotesList);
        return ResponseEntity.ok().body(body);
    }

    @DeleteMapping(value = "/api/admin/tutorNotes/{id}", produces = "application/json")
    public ResponseEntity<String> deleteCourse(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id) throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization))
            return getUnauthorizedResponse("admin");
        Optional<TutorNotes> tutorNote = tutorNotesRepository.findById(id);
        if (!tutorNote.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tutorNotesRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
