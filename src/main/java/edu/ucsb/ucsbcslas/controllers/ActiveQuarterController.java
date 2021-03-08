package edu.ucsb.ucsbcslas.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import edu.ucsb.ucsbcslas.repositories.ActiveQuarterRepository;

@RestController
public class ActiveQuarterController {
  private final Logger logger = LoggerFactory.getLogger(ActiveQuarterController.class);
  @Autowired
  private AuthControllerAdvice authControllerAdvice;
  @Autowired
  private ActiveQuarterRepository activeQuarterRepo;

  private ObjectMapper mapper = new ObjectMapper();

  private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
    Map<String, String> response = new HashMap<String, String>();
    response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
    String body = mapper.writeValueAsString(response);
    return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
  }

  @PostMapping(value = "/api/admin/filter/{activeValue}", produces = "application/json")
  public ResponseEntity<String> createFilter(@RequestHeader("Authorization") String authorization,
      @PathVariable("activeValue") String activeValue) throws JsonProcessingException {
    if (!authControllerAdvice.getIsAdmin(authorization))
      return getUnauthorizedResponse("admin");
    activeQuarterRepo.deleteAll();
    
    String quarterId = "";
    String quarterYear = "20" + String.valueOf(activeValue.substring(1));

    if(activeValue.charAt(0) == 'W'){
      quarterId = "1";
    }
    else if(activeValue.charAt(0) == 'S'){
      quarterId = "2";
    }
    else if(activeValue.charAt(0) == 'M'){
      quarterId = "3";
    }
    else if(activeValue.charAt(0) == 'F'){
      quarterId = "4";
    }

    String fullQuarterVal = quarterYear + quarterId;

    
    
    ActiveQuarter active = new ActiveQuarter();
    active.setActiveQuarter(fullQuarterVal);
    activeQuarterRepo.save(active);
    String body = mapper.writeValueAsString(active);

    return ResponseEntity.ok().body(body);
  }



  @GetMapping(value = "/api/public/filter", produces = "application/json")
  public ResponseEntity<String> getfilter() throws JsonProcessingException {

    List<ActiveQuarter> activeQList = activeQuarterRepo.findAll();
    ObjectMapper mapper = new ObjectMapper();

    String body = mapper.writeValueAsString(activeQList);
    return ResponseEntity.ok().body(body);
  }


}
