package edu.ucsb.ucsbcslas.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.documents.Login;
import edu.ucsb.ucsbcslas.repositories.AdminRepository;
import edu.ucsb.ucsbcslas.repositories.AppUserRepository;
import edu.ucsb.ucsbcslas.repositories.LoginsRepository;
import edu.ucsb.ucsbcslas.entities.Admin;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginsController {
    private final Logger logger = LoggerFactory.getLogger(LoginsController.class);

    @Autowired
    LoginsRepository loginsRepository;

    // Gives controller class advice on authorization
    @Autowired
    private AuthControllerAdvice authControllerAdvice;

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/admin/logins")
    public ResponseEntity<String> getLogins(@RequestHeader("Authorization") String authorization)
            throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization))        //Check for admin
            return getUnauthorizedResponse("admin");


        // Start experiment
        // Login login = new Login("10:00", "cgaucho@ucsb.edu", "Chris", "Gaucho", "12335", "member");
        // loginsRepository.save(login);
        // End experiment


        Iterable<Login> logins = loginsRepository.findAll();
        logger.info("logins = {}", logins);
        String body = mapper.writeValueAsString(logins);

        logger.info("body = {}", body);

        return ResponseEntity.ok().body(body);
    }
}
