package edu.ucsb.ucsbcslas.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.RoomSlot;
import edu.ucsb.ucsbcslas.repositories.RoomSlotRepository;

@RestController
public class RoomSlotController {

    @Autowired
    private AuthControllerAdvice authControllerAdvice;
    @Autowired
    private RoomSlotRepository roomSlotRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private ResponseEntity<String> getUnauthorizedResponse(String roleRequired) throws JsonProcessingException {
        Map<String, String> response = Map.of(
            "error", String.format("Unauthorized; only %s may access this resource.", roleRequired)
        );
        String body = objectMapper.writeValueAsString(response);
        return new ResponseEntity<String>(body, HttpStatus.UNAUTHORIZED);
    }
    
    // create room slot
    @PostMapping(value = "/api/admin/roomslot", produces = "application/json")
    public ResponseEntity<String> createRoomSlot(@RequestHeader("Authorization") String authorization,
            @RequestBody @Valid RoomSlot roomSlot) throws JsonProcessingException {

        System.out.println(roomSlot.toString());

        if (!authControllerAdvice.getIsAdmin(authorization))
           return getUnauthorizedResponse("admin");

        RoomSlot savedRoomSlot = roomSlotRepository.save(roomSlot);
        String body = objectMapper.writeValueAsString(savedRoomSlot);
        return ResponseEntity.ok().body(body);
    }


    // delete room slot by ID
    @DeleteMapping(value = "/api/admin/roomslot/{id}", produces = "application/json")
    public ResponseEntity<String> deleteRoomSlot(@RequestHeader("Authorization") String authorization,
            @PathVariable("id") Long id) throws JsonProcessingException {
              
        if (!authControllerAdvice.getIsAdmin(authorization))
           return getUnauthorizedResponse("admin");
        
        Optional<RoomSlot> roomSlot = roomSlotRepository.findById(id);

        if (!roomSlot.isPresent()) 
            return ResponseEntity.notFound().build();
        
        roomSlotRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // get all room slots
    @GetMapping(value = "/api/public/roomslot", produces = "application/json")
    public ResponseEntity<String> getRoomSlots() throws JsonProcessingException {
        List<RoomSlot> roomSlotList = roomSlotRepository.findAll();

        String body = objectMapper.writeValueAsString(roomSlotList);
        return ResponseEntity.ok().body(body);
    }

    // get room slot by ID
    @GetMapping(value = "/api/public/roomslot/{id}", produces = "application/json")
    public ResponseEntity<String> getRoomSlot(@PathVariable("id") Long id) throws JsonProcessingException {
        Optional<RoomSlot> roomSlot = roomSlotRepository.findById(id);

        if (roomSlot.isEmpty())
            return ResponseEntity.notFound().build();

        String body = objectMapper.writeValueAsString(roomSlot.get());
        return ResponseEntity.ok().body(body);
    }

}