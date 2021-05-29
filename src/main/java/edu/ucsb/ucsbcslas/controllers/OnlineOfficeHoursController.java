package edu.ucsb.ucsbcslas.controllers;

import org.slf4j.Logger;
import java.io.*;
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
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.repositories.OnlineOfficeHoursRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;

@RestController
public class OnlineOfficeHoursController {
    private final Logger logger = LoggerFactory.getLogger(OnlineOfficeHoursController.class);

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private OnlineOfficeHoursRepository officeHoursRepository;
    @Autowired
    private TutorRepository tutorRepository;

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(value = "/api/admin/officeHours", produces = "application/json")
    public ResponseEntity<String> createOfficeHour(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid OnlineOfficeHours officeHour) throws JsonProcessingException {
                System.out.println(officeHour.toString());
        if (!authControllerAdvice.getIsAdmin(authorization))
           return getUnauthorizedResponse("admin");
        OnlineOfficeHours savedOfficeHour = officeHoursRepository.save(officeHour);
        String body = mapper.writeValueAsString(savedOfficeHour);
        return ResponseEntity.ok().body(body);
    }

    @PutMapping(value = "/api/admin/officeHours/{id}", produces = "application/json")
    public ResponseEntity<String> updateOfficeHour(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id, @RequestBody @Valid OnlineOfficeHours incomingOfficeHour) throws JsonProcessingException {
                Boolean isAdmin = authControllerAdvice.getIsAdmin(authorization);
        if (!isAdmin){
            return getUnauthorizedResponse("admin");
        }
        
        Optional<OnlineOfficeHours> officeHour = officeHoursRepository.findById(id);
        if (!officeHour.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        if (!incomingOfficeHour.getId().equals(id)) {
            return ResponseEntity.badRequest().build();
        }

        officeHoursRepository.save(incomingOfficeHour);
        String body = mapper.writeValueAsString(incomingOfficeHour);
        return ResponseEntity.ok().body(body);
    }

    @DeleteMapping(value = "/api/admin/officeHours/{id}", produces = "application/json")
    public ResponseEntity<String> deleteOfficeHour(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id) throws JsonProcessingException {
            Boolean isAdmin = authControllerAdvice.getIsAdmin(authorization);
        if (!isAdmin){
            return getUnauthorizedResponse("admin");
        }

        Optional<OnlineOfficeHours> officeHour = officeHoursRepository.findById(id);
        if (!officeHour.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        officeHoursRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/api/public/officeHours", produces = "application/json")
    public ResponseEntity<String> getOfficeHours() throws JsonProcessingException {
        List<OnlineOfficeHours> officeHourList = officeHoursRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();

        String body = mapper.writeValueAsString(officeHourList);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/public/officeHours/{id}", produces = "application/json")
    public ResponseEntity<String> getOfficeHour(@PathVariable("id") Long id) throws JsonProcessingException {
        Optional<OnlineOfficeHours> officeHour = officeHoursRepository.findById(id);
        if (officeHour.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(officeHour.get());
        return ResponseEntity.ok().body(body);
    }

}
