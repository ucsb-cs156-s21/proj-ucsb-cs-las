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
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.opencsv.CSVWriter;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import java.io.IOException;
import java.io.StringWriter;

@RestController
public class CourseController {
  private final Logger logger = LoggerFactory.getLogger(CourseController.class);

  @Autowired
  private AuthControllerAdvice authControllerAdvice;
  @Autowired
  private CourseRepository courseRepository;

  private ObjectMapper mapper = new ObjectMapper();

  private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
    Map<String, String> response = new HashMap<String, String>();
    response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
    String body = mapper.writeValueAsString(response);
    return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
  }

  @PostMapping(value = "/api/admin/courses", produces = "application/json")
  public ResponseEntity<String> createCourse(@RequestHeader("Authorization") String authorization,
      @RequestBody @Valid Course course) throws JsonProcessingException {
    if (!authControllerAdvice.getIsAdmin(authorization))
      return getUnauthorizedResponse("admin");
    Course savedCourse = courseRepository.save(course);
    String body = mapper.writeValueAsString(savedCourse);
    return ResponseEntity.ok().body(body);
  }

  @PutMapping(value = "/api/admin/courses/{id}", produces = "application/json")
  public ResponseEntity<String> updateCourse(@RequestHeader("Authorization") String authorization,
      @PathVariable("id") Long id, @RequestBody @Valid Course incomingCourse) throws JsonProcessingException {
    if (!authControllerAdvice.getIsAdmin(authorization))
      return getUnauthorizedResponse("admin");
    Optional<Course> course = courseRepository.findById(id);
    if (!course.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    if (!incomingCourse.getId().equals(id)) {
      return ResponseEntity.badRequest().build();
    }

    courseRepository.save(incomingCourse);
    String body = mapper.writeValueAsString(incomingCourse);
    return ResponseEntity.ok().body(body);
  }

  @DeleteMapping(value = "/api/admin/courses/{id}", produces = "application/json")
  public ResponseEntity<String> deleteCourse(@RequestHeader("Authorization") String authorization,
      @PathVariable("id") Long id) throws JsonProcessingException {
    if (!authControllerAdvice.getIsAdmin(authorization))
      return getUnauthorizedResponse("admin");
    Optional<Course> course = courseRepository.findById(id);
    if (!course.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    courseRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping(value = "/api/public/courses", produces = "application/json")
  public ResponseEntity<String> getCourses() throws JsonProcessingException {
    List<Course> courseList = courseRepository.findAll();
    ObjectMapper mapper = new ObjectMapper();

    String body = mapper.writeValueAsString(courseList);
    return ResponseEntity.ok().body(body);
  }

  @GetMapping(value = "/api/public/courses/{id}", produces = "application/json")
  public ResponseEntity<String> getCourse(@PathVariable("id") Long id) throws JsonProcessingException {
    Optional<Course> course = courseRepository.findById(id);
    if (course.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    ObjectMapper mapper = new ObjectMapper();
    String body = mapper.writeValueAsString(course.get());
    return ResponseEntity.ok().body(body);
  }

}
