package edu.ucsb.ucsbcslas.controllers;

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

import javax.validation.Valid;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorNotes;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorNotesRepository;

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

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    private ResponseEntity<String> getIncorrectInputResponse() throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String
                .format("Misformatted Input; Check that the tutor email that was input is assigned to a valid tutor"));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/api/member/tutorNotes", produces = "application/json")
    public ResponseEntity<String> createTutorNotes(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid String tutorNotes) throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization)) {
            if (courseRepository.findAllByInstructorEmail(authControllerAdvice.getUser(authorization).getEmail())
                    .isEmpty()) {
                return getUnauthorizedResponse("instructor");
            }
        }

        JSONObject ta = new JSONObject(tutorNotes);
        TutorNotes newNotes = new TutorNotes();

        JSONObject cInfo = new JSONObject(ta.get("course").toString());
        logger.info("course= {}", cInfo);
        Course c = new Course(cInfo.getLong("id"), cInfo.getString("name"), cInfo.getString("quarter"),
                cInfo.getString("instructorFirstName"), cInfo.getString("instructorLastName"),
                cInfo.getString("instructorEmail"));
        newNotes.setCourse(c);

        Optional<Tutor> tutor = tutorRepository.findByEmail(ta.getString("tutorEmail"));
        if (tutor.isPresent()) {
            newNotes.setTutor(tutor.get());
        } else {
            return getIncorrectInputResponse();
        }
        newNotes.setMessage(ta.getString("NotesType"));

        logger.info("newNotes= {}", newNotes);
        TutorNotes savedTutorNotes = tutorNotesRepository.save(newNotes);
        String body = mapper.writeValueAsString(savedTutorNotes);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/tutorNotes", produces = "application/json")
    public ResponseEntity<String> getTutorNotes(@RequestHeader("Authorization") String authorization)
            throws JsonProcessingException {
        List<TutorNotes> tutorNotesList = new ArrayList();
        if (authControllerAdvice.getIsAdmin(authorization)) {
            tutorNotesList = tutorNotesRepository.findAll();
            if (tutorNotesList.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            ObjectMapper mapper = new ObjectMapper();
            String body = mapper.writeValueAsString(tutorNotesList);
            return ResponseEntity.ok().body(body);
        } else {
            List<Course> courseList = courseRepository
                    .findAllByInstructorEmail(authControllerAdvice.getUser(authorization).getEmail());
            if (!(courseList.isEmpty())) {
                for (Course temp : courseList) {
                    Optional<Course> course = courseRepository.findById(temp.getId());
                    if (course.isPresent()) {
                        List<TutorNotes> tutorNotes = tutorNotesRepository
                                .findAllByCourse(course.get());
                        tutorNotesList.addAll(tutorNotes);
                    }
                }
                if (tutorNotesList.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }
                ObjectMapper mapper = new ObjectMapper();
                String body = mapper.writeValueAsString(tutorNotesList);
                return ResponseEntity.ok().body(body);
            }
        }
        if (authControllerAdvice.getIsMember(authorization)) {
            Optional<Tutor> tutor = tutorRepository.findByEmail(authControllerAdvice.getUser(authorization).getEmail());
            if (tutor.isPresent()) {
                List<TutorNotes> tutorNotes = tutorNotesRepository.findAllByTutor(tutor.get());
                tutorNotesList.addAll(tutorNotes);
            }
            if (tutorNotesList.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            ObjectMapper mapper = new ObjectMapper();
            String body = mapper.writeValueAsString(tutorNotesList);
            return ResponseEntity.ok().body(body);
        }
        return getUnauthorizedResponse("member");
    }
    
    @GetMapping(value = "/api/member/tutorNotes/{course_id}", produces = "application/json")
    public ResponseEntity<String> getTutorNotesByCourseID(@PathVariable("course_id") Long course_id) throws JsonProcessingException {
        List<TutorNotes> tutorNotes = tutorNotesRepository.findAllByCourseId(course_id);

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorNotes);
        return ResponseEntity.ok().body(body);
    }

    /**
     * return a list of all course numbers that appear in the tutor Notes table
     * 
     * @return response containing a list of all course numbers
     * @throws JsonProcessingException
     */
    @GetMapping(value = "/api/member/tutorNotes/course_numbers", produces = "application/json")
    public ResponseEntity<String> getCourseNumbers() throws JsonProcessingException {
        List<TutorNotes> tutorNotes = tutorNotesRepository.findAll();
        Set<String> courseNumbers = new HashSet<String>();
        for (TutorNotes ta : tutorNotes) {
            courseNumbers.add(ta.getCourse().getName());

        }

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(courseNumbers);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/tutorNotes/byCourseNumber/{courseNumber}", produces = "application/json")
    public ResponseEntity<String> getTutorNotesByCourseID(@PathVariable("courseNumber") String courseNumber)
            throws JsonProcessingException {
        List<TutorNotes> tutorNotes = tutorNotesRepository.findAll();
        List<TutorNotes> tutorNotesMatchingCourse = new ArrayList<TutorNotes>();
        for (TutorNotes ta : tutorNotes) {
            if (ta.getCourse().getName().equals(courseNumber)) {
                tutorNotesMatchingCourse.add(ta);
            }

        }
        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorNotesMatchingCourse);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/member/tutorNotes/byTutor/{tutor}", produces = "application/json")
    public ResponseEntity<String> getTutorNotesByTutor(@PathVariable("tutor") String tutorEmail)
            throws JsonProcessingException {

        Optional<Tutor> tutor = tutorRepository.findByEmail(tutorEmail);
        List<TutorNotes> tutorNotes = new ArrayList<TutorNotes>();
        tutorNotes = tutorNotesRepository.findAllByTutor(tutor.get());
        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorNotes);
        return ResponseEntity.ok().body(body);

    }
  
  
    @GetMapping(value = "/api/member/tutorNotes/{id}", produces = "application/json")
    public ResponseEntity<String> getTutorNotes(@PathVariable("id") Long id) throws JsonProcessingException {
        Optional<TutorNotes> tutorNotes = tutorNotesRepository.findById(id);
        if (tutorNotes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(tutorNotes.get());
        return ResponseEntity.ok().body(body);
    }
  
    @PutMapping(value = "/api/member/tutorNotes/{id}", produces = "application/json")
    public ResponseEntity<String> updateTutorNotes(@RequestHeader("Authorization") String authorization,
        @PathVariable("id") Long id, @RequestBody @Valid String incomingTutorNotes) throws JsonProcessingException {

      if (!authControllerAdvice.getIsAdmin(authorization))
        return getUnauthorizedResponse("admin");
      Optional<TutorNotes> tutorNotes = tutorNotesRepository.findById(id);
      if (!tutorNotes.isPresent()) {
        return ResponseEntity.notFound().build();
      }
      logger.info(incomingTutorNotes);
      JSONObject ta = new JSONObject(incomingTutorNotes);
      TutorNotes newNotes = new TutorNotes();
      logger.info("ta: ", ta.toString());
      JSONObject cInfo = new JSONObject(ta.get("course").toString());
      logger.info("cInfo: ", cInfo.toString());
      Course c = new Course(cInfo.getLong("id"), cInfo.getString("name"), cInfo.getString("quarter"), 
        cInfo.getString("instructorFirstName"), cInfo.getString("instructorLastName"), cInfo.getString("instructorEmail"));
      newNotes.setCourse(c);


      logger.info("tutorNotes: ", tutorNotes.get().getTutor().getEmail());
      logger.info("ta: ", ta.getString("tutorEmail"));
      if(!(ta.getString("tutorEmail").equals(tutorNotes.get().getTutor().getEmail()))){
        Optional<Tutor> tutor = tutorRepository.findByEmail(ta.getString("tutorEmail"));
        logger.info("tutor: ", tutor);
        if(tutor.isPresent()){
          newNotes.setTutor(tutor.get());
        }
        else{
          return getIncorrectInputResponse();
        }
      } else {

        JSONObject tInfo = new JSONObject(ta.get("tutor").toString());
        Tutor t = new Tutor(tInfo.getLong("id"), tInfo.getString("firstName"), tInfo.getString("lastName"), 
        tInfo.getString("email"));
        newNotes.setTutor(t);


      }
      newNotes.setMessage(ta.getString("NotesType"));


      newNotes.setId(id);
      tutorNotesRepository.save(newNotes);
      String body = mapper.writeValueAsString(newNotes);
      return ResponseEntity.ok().body(body);
    }
  
}
