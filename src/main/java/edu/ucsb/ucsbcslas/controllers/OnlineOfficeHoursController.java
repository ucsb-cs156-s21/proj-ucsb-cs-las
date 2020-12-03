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
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.repositories.OnlineOfficeHoursRepository;

//

/* take this and replace the code with code that makes sense for office hours */

@RestController
public class OnlineOfficeHoursController {
    private final Logger logger = LoggerFactory.getLogger(OnlineOfficeHoursController.class);

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private OnlineOfficeHoursRepository onlineOfficeHoursRepository;

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping(value = "/api/admin/onlineofficehours", produces = "application/json")
    public ResponseEntity<String> createOnlineOfficeHours(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid OnlineOfficeHours onlineOfficeHours) throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization))
            return getUnauthorizedResponse("admin");
        OnlineOfficeHours savedOnlineOfficeHours = onlineOfficeHoursRepository.save(onlineOfficeHours);
        String body = mapper.writeValueAsString(savedOnlineOfficeHours);
        return ResponseEntity.ok().body(body);
    }

    @PutMapping(value = "/api/admin/onlineofficehours/{id}", produces = "application/json")
    public ResponseEntity<String> updateOnlineOfficeHours(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id, @RequestBody @Valid OnlineOfficeHours incomingOnlineOfficeHours) throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization))
            return getUnauthorizedResponse("admin");
        Optional<OnlineOfficeHours> onlineOfficeHours = onlineOfficeHoursRepository.findById(id);
        if (!onlineOfficeHours.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        if (!incomingOnlineOfficeHours.getId().equals(id)) {
            return ResponseEntity.badRequest().build();
        }

        onlineOfficeHoursRepository.save(incomingOnlineOfficeHours);
        String body = mapper.writeValueAsString(incomingOnlineOfficeHours);
        return ResponseEntity.ok().body(body);
    }

    @DeleteMapping(value = "/api/admin/onlineofficehours/{id}", produces = "application/json")
    public ResponseEntity<String> deleteOnlineOfficeHours(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id) throws JsonProcessingException {
        if (!authControllerAdvice.getIsAdmin(authorization))
            return getUnauthorizedResponse("admin");
        Optional<OnlineOfficeHours> onlineOfficeHours = onlineOfficeHoursRepository.findById(id);
        if (!onlineOfficeHours.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        onlineOfficeHoursRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/api/public/onlineofficehours", produces = "application/json")
    public ResponseEntity<String> getOnlineOfficeHours() throws JsonProcessingException {
        List<OnlineOfficeHours> onlineOfficeHoursList = onlineOfficeHoursRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();

        String body = mapper.writeValueAsString(onlineOfficeHoursList);
        return ResponseEntity.ok().body(body);
    }

    @GetMapping(value = "/api/public/onlineofficehours/{id}", produces = "application/json")
    public ResponseEntity<String> getOnlineOfficeHours(@PathVariable("id") Long id) throws JsonProcessingException {
        Optional<OnlineOfficeHours> onlineOfficeHours = onlineOfficeHoursRepository.findById(id);
        if (onlineOfficeHours.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ObjectMapper mapper = new ObjectMapper();
        String body = mapper.writeValueAsString(onlineOfficeHours.get());
        return ResponseEntity.ok().body(body);
    }

}
