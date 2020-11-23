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
import edu.ucsb.ucsbcslas.entities.ActiveQuarter;
import edu.ucsb.ucsbcslas.repositories.activeQuarterRepository;

@RestController
public class ActiveQuarterController {
  private final Logger logger = LoggerFactory.getLogger(CourseController.class);

  @Autowired
  private AuthControllerAdvice authControllerAdvice;
  @Autowired
  private activeQuarterRepository activeQuarterRepo;

  private ObjectMapper mapper = new ObjectMapper();

  private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
    Map<String, String> response = new HashMap<String, String>();
    response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
    String body = mapper.writeValueAsString(response);
    return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
  }
  

  @PutMapping(value = "/api/admin/courses/activeQuarter/{active}", produces = "application/json")
  public ResponseEntity<String> updateCourse(@RequestHeader("Authorization") String authorization,@PathVariable("id") Long id, @RequestBody @Valid ActiveQuarter incoming) throws JsonProcessingException {
    if (!authControllerAdvice.getIsAdmin(authorization))
      return getUnauthorizedResponse("admin");
    ActiveQuarter active = activeQuarterRepo.findAll().get(0);
    activeQuarterRepo.save(incoming);
    String body = mapper.writeValueAsString(incoming);
    return ResponseEntity.ok().body(body);
  }

  

  @GetMapping(value = "/api/public/courses/activeQuarter", produces = "application/json")
  public ResponseEntity<String> getCourses() throws JsonProcessingException {
    activeQuarterRepo.save(new ActiveQuarter());
    List<ActiveQuarter> activeList = activeQuarterRepo.findAll();
    ObjectMapper mapper = new ObjectMapper();

    String body = mapper.writeValueAsString(activeList);
    return ResponseEntity.ok().body(body);
  }



}
