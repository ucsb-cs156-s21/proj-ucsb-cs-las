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
import edu.ucsb.ucsbcslas.repositories.RoomSlotRepository;

@RestController
public class RoomSlotController {
    private final Logger logger = LoggerFactory.getLogger(RoomSlotController.class);

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private RoomSlotRepository roomSlotRepository;

    private ObjectMapper mapper = new ObjectMapper();

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = new HashMap<String, String>();
        response.put("error", String.format("Unauthorized; only %s may access this resource.", roleRequired));
        String body = mapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }

    
    // create room slot
    @PostMapping(value = "/api/roomslot", produces = "application/json")
    public ResponseEntity<String> createRoomSlot(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid RoomSlot roomSlot) throws JsonProcessingException {
                System.out.println(roomSlot.toString());

        // should we require admin authorization to create a room?
        //if (!authControllerAdvice.getIsAdmin(authorization))
        //   return getUnauthorizedResponse("admin");

        RoomSlot savedRoomSlot = roomSlotRepository.save(roomSlot);
        String body = mapper.writeValueAsString(savedRoomSlot);
        return ResponseEntity.ok().body(body);
    }


    // delete room slot by ID
    @DeleteMapping(value = "/api/roomslot/{id}", produces = "application/json")
    public ResponseEntity<String> deleteRoomSlot(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id) throws JsonProcessingException {
            Boolean isAdmin = authControllerAdvice.getIsAdmin(authorization);

        // should we require admin authorization to delete a room?
        //if (!isAdmin)
        //    return getUnauthorizedResponse("admin");
        
        Optional<OnlineOfficeHours> officeHour = officeHoursRepository.findById(id);
        if (!officeHour.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        officeHoursRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // get all room slots
    @GetMapping(value = "/api/roomslot", produces = "application/json")
    public ResponseEntity<String> getOfficeHours() throws JsonProcessingException {
        List<OnlineOfficeHours> officeHourList = officeHoursRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();

        String body = mapper.writeValueAsString(officeHourList);
        return ResponseEntity.ok().body(body);
    }

    // get room slot by ID
    @GetMapping(value = "/api/roomslot/{id}", produces = "application/json")
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
