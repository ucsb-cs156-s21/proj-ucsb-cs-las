package edu.ucsb.ucsbcslas.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile; 
import org.springframework.web.server.ResponseStatusException; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam; 
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import java.io.IOException; 
import java.io.InputStreamReader;
import java.io.Reader; 
import java.lang.*; 
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.services.CSVToObjectService; 
import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.entities.AppUser; 
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;;

@RestController
public class TutorController {
    private final Logger logger = LoggerFactory.getLogger(TutorController.class);

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TutorAssignmentRepository tutorAssignmentRepository;
    @Autowired
    CSVToObjectService<Tutor> csvToObjectService; 

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(value = "/api/member/tutors", produces = "application/json")
    public ResponseEntity<String> createTutor(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid Tutor tutor) throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization)) {
            if (courseRepository.findAllByInstructorEmail(authControllerAdvice.getUser(authorization).getEmail())
                    .isEmpty()) {
                return getUnauthorizedResponse("instructor");
            }
        }
        Tutor savedTutor = tutorRepository.save(tutor);
        String body = mapper.writeValueAsString(savedTutor);
        return ResponseEntity.ok().body(body);
    }

    @PostMapping(value = "/api/member/tutors/upload", produces = "application/json")
    public ResponseEntity<String> uploadCSV(@RequestParam("csv") MultipartFile csv, @RequestHeader("Authorization") String authorization) throws IOException {
        logger.info("Starting upload CSV");
        AppUser user = authControllerAdvice.getUser(authorization);
        try {
            Reader reader = new InputStreamReader(csv.getInputStream());
            logger.info(new String(csv.getInputStream().readAllBytes()));
            List<Tutor> uploadedTutors = csvToObjectService.parse(reader, Tutor.class);
            List<Tutor> savedTutors = (List<Tutor>) tutorRepository.saveAll(uploadedTutors);
            String body = mapper.writeValueAsString(savedTutors);
            return ResponseEntity.ok().body(body);
        }   catch(RuntimeException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Malformed CSV", e);
        }
    }

    @PutMapping(value = "/api/member/tutors/{id}", produces = "application/json")
    public ResponseEntity<String> updateTutor(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id, @RequestBody @Valid Tutor incomingTutor) throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization)) {
            if (courseRepository.findAllByInstructorEmail(authControllerAdvice.getUser(authorization).getEmail())
                    .isEmpty()) {
                return getUnauthorizedResponse("instructor");
            }
        }
        Optional<Tutor> tutor = tutorRepository.findById(id);
        if (!tutor.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        if (!incomingTutor.getId().equals(id)) {
            return ResponseEntity.badRequest().build();
        }

        tutorRepository.save(incomingTutor);
        String body = mapper.writeValueAsString(incomingTutor);
        return ResponseEntity.ok().body(body);
    }

    @DeleteMapping(value = "/api/member/tutors/{id}", produces = "application/json")
    public ResponseEntity<String> deleteTutor(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id) throws JsonProcessingException {

        if (!authControllerAdvice.getIsAdmin(authorization)) {
            if (courseRepository.findAllByInstructorEmail(authControllerAdvice.getUser(authorization).getEmail())
                    .isEmpty()) {
                return getUnauthorizedResponse("instructor");
            }
        }
        Optional<Tutor> tutor = tutorRepository.findById(id);
        if (!tutor.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tutorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/api/member/tutors", produces = "application/json")
    public ResponseEntity<String> getTutors() throws JsonProcessingException {
        List<Tutor> tutorList = tutorRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorList);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/instructorTutors", produces = "application/json")
    public ResponseEntity<String> getInstructorTutors(@RequestHeader("Authorization") String authorization)
            throws JsonProcessingException {
        List<Course> courseList = courseRepository
                .findAllByInstructorEmail(authControllerAdvice.getUser(authorization).getEmail());
        List<Tutor> tutorList = new ArrayList<Tutor>();
        ObjectMapper mapper = new ObjectMapper();
        
        if(courseList.isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            for (Course c : courseList) {
                List<TutorAssignment> allTutorAssignments = tutorAssignmentRepository.findAllByCourse(c);
                for (TutorAssignment a : allTutorAssignments) {
                    tutorList.add(a.getTutor());
                }
            }
        }
        String body = mapper.writeValueAsString(tutorList);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/tutors/{id}", produces = "application/json")
    public ResponseEntity<String> getTutor(@PathVariable("id") Long id) throws JsonProcessingException {
        Optional<Tutor> tutor = tutorRepository.findById(id);
        if (tutor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutor.get());
        return ResponseEntity.ok().body(body);
    }

}
