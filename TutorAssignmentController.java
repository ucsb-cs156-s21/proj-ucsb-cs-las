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
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;

@RestController
public class TutorAssignmentController {
  private final Logger logger = LoggerFactory.getLogger(TutorAssignmentController.class);

  @Autowired
  private AuthControllerAdvice authControllerAdvice;
  @Autowired
  private TutorAssignmentRepository tutorAssignmentRepository;
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
    response.put("error", String.format("Misformatted Input; Check that the tutor email that was input is assigned to a valid tutor"));
    String body = mapper.writeValueAsString(response);
    return new ResponseEntity<String>(body, HttpStatus.BAD_REQUEST);
  }

  @PostMapping(value = "/api/member/tutorAssignments", produces = "application/json")
  public ResponseEntity<String> createTutorAssignment(@RequestHeader("Authorization") String authorization,
      @RequestBody @Valid String tutorAssignment) throws JsonProcessingException {
    

    JSONObject ta = new JSONObject(tutorAssignment);
    TutorAssignment newAssignment = new TutorAssignment();

    JSONObject cInfo = new JSONObject(ta.get("course").toString());
    logger.info("course= {}", cInfo);
    Course c = new Course(cInfo.getLong("id"), cInfo.getString("name"), cInfo.getString("quarter"), 
      cInfo.getString("instructorFirstName"), cInfo.getString("instructorLastName"), cInfo.getString("instructorEmail"));
    newAssignment.setCourse(c);

    Optional<Tutor> tutor = tutorRepository.findByEmail(ta.getString("tutorEmail"));
    if(tutor.isPresent()){
      newAssignment.setTutor(tutor.get());
    }
    else{
      return getIncorrectInputResponse();
    }
    newAssignment.setAssignmentType(ta.getString("assignmentType"));

    logger.info("newAssignment= {}", newAssignment);
    TutorAssignment savedTutorAssignment = tutorAssignmentRepository.save(newAssignment);
    String body = mapper.writeValueAsString(savedTutorAssignment);
    return ResponseEntity.ok().body(body);
  }

  @GetMapping(value = "/api/member/tutorAssignments/{id}", produces = "application/json")
  public ResponseEntity<String> getTutorAssignments(@RequestHeader("Authorization") String authorization) throws JsonProcessingException {
    List<TutorAssignment> tutorAssignmentList = new ArrayList();
    if (authControllerAdvice.getIsAdmin(authorization)){
      tutorAssignmentList = tutorAssignmentRepository.findAll();
      if(tutorAssignmentList.isEmpty()){
        return ResponseEntity.notFound().build();
      }
      ObjectMapper mapper = new ObjectMapper();
      String body = mapper.writeValueAsString(tutorAssignmentList);
      return ResponseEntity.ok().body(body);
    } 
    if(authControllerAdvice.getIsMember(authorization)){
      Optional<Tutor> tutor = tutorRepository.findByEmail(authControllerAdvice.getUser(authorization).getEmail());
      if(tutor.isPresent()){
        List<TutorAssignment> tutorAssignments = tutorAssignmentRepository.findAllByTutor(tutor.get());
        tutorAssignmentList.addAll(tutorAssignments);
      }
      if(tutorAssignmentList.isEmpty()){
        return ResponseEntity.notFound().build();
      }
      ObjectMapper mapper = new ObjectMapper();
      String body = mapper.writeValueAsString(tutorAssignmentList);
      return ResponseEntity.ok().body(body);
    } 
    return getUnauthorizedResponse("member");
  }
}