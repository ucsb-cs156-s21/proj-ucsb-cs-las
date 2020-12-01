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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;

@RestController
public class TutorAssignmentController {
  private final Logger logger = LoggerFactory.getLogger(TutorAssignmentController.class);

  @Autowired
  private AuthControllerAdvice authControllerAdvice;
  @Autowired
  private TutorAssignmentRepository tutorAssignmentRepository;

  private ObjectMapper mapper = new ObjectMapper();

  private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
    Map<String, String> response = new HashMap<String, String>();
    response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
    String body = mapper.writeValueAsString(response);
    return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
  }

//   @PostMapping(value = "/api/admin/tutorAssignments", produces = "application/json")
//   public ResponseEntity<String> createTutorAssignment(@RequestHeader("Authorization") String authorization,
//       @RequestBody @Valid TutorAssignment tutorAssignment) throws JsonProcessingException {
//     if (!authControllerAdvice.getIsAdmin(authorization))
//       return getUnauthorizedResponse("admin");
//     TutorAssignment savedTutorAssignment = tutorAssignmentRepository.save(tutorAssignment);
//     String body = mapper.writeValueAsString(savedTutorAssignment);
//     return ResponseEntity.ok().body(body);
//   }

//   @PutMapping(value = "/api/admin/tutorAssignments/{id}", produces = "application/json")
//   public ResponseEntity<String> updateTutorAssignment(@RequestHeader("Authorization") String authorization,
//       @PathVariable("id") Long id, @RequestBody @Valid TutorAssignment incomingTutorAssignment) throws JsonProcessingException {
//     if (!authControllerAdvice.getIsAdmin(authorization))
//       return getUnauthorizedResponse("admin");
//     Optional<TutorAssignment> tutorAssignment = tutorAssignmentRepository.findById(id);
//     if (!tutorAssignment.isPresent()) {
//       return ResponseEntity.notFound().build();
//     }

//     if (!incomingTutorAssignment.getId().equals(id)) {
//       return ResponseEntity.badRequest().build();
//     }

//     courseRepository.save(incomingTutorAssignment);
//     String body = mapper.writeValueAsString(incomingTutorAssignment);
//     return ResponseEntity.ok().body(body);
//   }

//   @DeleteMapping(value = "/api/admin/courses/{id}", produces = "application/json")
//   public ResponseEntity<String> deleteCourse(@RequestHeader("Authorization") String authorization,
//       @PathVariable("id") Long id) throws JsonProcessingException {
//     if (!authControllerAdvice.getIsAdmin(authorization))
//       return getUnauthorizedResponse("admin");
//     Optional<Course> course = courseRepository.findById(id);
//     if (!course.isPresent()) {
//       return ResponseEntity.notFound().build();
//     }
//     courseRepository.deleteById(id);
//     return ResponseEntity.noContent().build();
//   }

  @GetMapping(value = "/api/public/tutorAssignments", produces = "application/json")
  public ResponseEntity<String> getTutorAssignments(@RequestHeader("Authorization") String authorization) throws JsonProcessingException {
    List<TutorAssignment> tutorAssignmentList;
    if (authControllerAdvice.getIsAdmin(authorization)){
        tutorAssignmentList = tutorAssignmentRepository.findAll();
    } else {
        instructor = authControllerAdvice.getUser(authorization);
        email = instructor.getEmail();
        List<Course> courseList = courseRepository.findAllByInstructorEmail(email);
        for(int i = 0; i < courseList.size(); i++){
            tutorAssignmentList += tutorAssignmentRepository.findById(courseList[i].getId());
        }
    }

    if (authControllerAdvice.getIsMember(authorization) && tutorAssignmentList.isEmpty()){
        member = authControllerAdvice.getUser(authorization);
        id = member.getId();
        tutorAssignmentList = tutorAssignmentRepository.findById(id);
    } 
    ObjectMapper mapper = new ObjectMapper();

    String body = mapper.writeValueAsString(tutorAssignmentList);
    return ResponseEntity.ok().body(body);
  }
}
