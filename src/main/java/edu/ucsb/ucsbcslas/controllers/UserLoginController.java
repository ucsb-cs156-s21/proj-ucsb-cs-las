package edu.ucsb.ucsbcslas.controllers;

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
import edu.ucsb.ucsbcslas.documents.UserLogin;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.UserLoginRepository;

@RestController
public class UserLoginController {
  private final Logger logger = LoggerFactory.getLogger(CourseController.class);

  @Autowired
  private AuthControllerAdvice authControllerAdvice;
  
  @Autowired
  private UserLoginRepository userLoginRepository;

  private ObjectMapper mapper = new ObjectMapper();

  private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
    Map<String, String> response = new HashMap<String, String>();
    response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
    String body = mapper.writeValueAsString(response);
    return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
  }

  @PostMapping(value = "/api/userlogin", produces = "application/json")
  public ResponseEntity<String> createUserLogin(@RequestHeader("Authorization") String authorization) throws JsonProcessingException {
   
    UserLogin savedUserLogin = userLoginRepository.save(userLogin);
    String body = mapper.writeValueAsString(userLogin);
    return ResponseEntity.ok().body(body);
  }

  @GetMapping(value = "/api/userlogin", produces = "application/json")
  public ResponseEntity<String> getCourses() throws JsonProcessingException {
    List<UserLogin> logins = userLoginRepository.findAll();
    ObjectMapper mapper = new ObjectMapper();

    String body = mapper.writeValueAsString(logins);
    return ResponseEntity.ok().body(body);
  }

}
