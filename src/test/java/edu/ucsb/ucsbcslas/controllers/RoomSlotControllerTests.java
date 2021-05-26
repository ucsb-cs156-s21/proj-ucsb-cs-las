package edu.ucsb.ucsbcslas.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.lang.IllegalArgumentException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.Assert.fail;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.RoomSlot;
import edu.ucsb.ucsbcslas.repositories.RoomSlotRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.models.Course;
import jdk.jfr.Timestamp;

@WebMvcTest(value = RoomSlotController.class)
@WithMockUser
public class RoomSlotControllerTests {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  AuthControllerAdvice mockAuthControllerAdvice;

  @MockBean
  RoomSlotRepository mockRoomSlotRepository;
  
  private String userToken() {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
    }
    
    
    @Test
    public void testGetRoomSlot() throws Exception {
      List<RoomSlot> expectedRoomSlots = new ArrayList<RoomSlot>();
      expectedRoomSlots.add(new RoomSlot(1L, "s21", "Wednesday", "8:00", "10:00"));
      // (Long id, quarter, String dayOfWeek, String
      // startTime, String endTime)

      when(mockRoomSlotRepository.findAll()).thenReturn(expectedRoomSlots);

      MvcResult response = mockMvc.perform(get("/api/public/roomslot").contentType("application/json")
          .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

      verify(mockRoomSlotRepository, times(1)).findAll();

      String responseString = response.getResponse().getContentAsString();
      List<RoomSlot> actualRoomSlots = objectMapper.readValue(responseString,
          new TypeReference<List<RoomSlot>>() {
          });
      assertEquals(actualRoomSlots, expectedRoomSlots);
    }

    @Test
    public void testGetASingleRoomSlot() throws Exception {
        RoomSlot expectedRoomSlots = new RoomSlot(1L, "s21", "Wednesday", "8:00", "10:00");
        
      when(mockRoomSlotRepository.findById(1L)).thenReturn(Optional.of(expectedRoomSlots));
      MvcResult response = mockMvc.perform(get("/api/roomslot/1").contentType("application/json")
          .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

      verify(mockRoomSlotRepository, times(1)).findById(1L);

      String responseString = response.getResponse().getContentAsString();
      RoomSlot actualRoomSlots = objectMapper.readValue(responseString, RoomSlot.class);
      assertEquals(actualRoomSlots, expectedRoomSlots);
    }

    @Test
    public void testGetANonExistingRoomSlot() throws Exception {
      when(mockRoomSlotRepository.findById(99999L)).thenReturn(Optional.ofNullable(null));
      mockMvc.perform(get("/api/roomslot/99999").contentType("application/json").header(HttpHeaders.AUTHORIZATION,
          "Bearer " + userToken())).andExpect(status().isNotFound());
    }
    

    //Need admin in the path of api or not??
    @Test
    public void testSaveRoomSlot() throws Exception {
      RoomSlot expectedRoomSlots = new RoomSlot(1L, "s21", "Wednesday", "8:00", "10:00");
      ObjectMapper mapper = new ObjectMapper();
      String requestBody = mapper.writeValueAsString(expectedRoomSlots);
      when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
      when(mockRoomSlotRepository.save(any())).thenReturn(expectedRoomSlots);
      MvcResult response = mockMvc.perform(
          post("/api/admin/roomslot").with(csrf()).contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
              .content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
          .andExpect(status().isOk()).andReturn();

      verify(mockRoomSlotRepository, times(1)).save(expectedRoomSlots);

      String responseString = response.getResponse().getContentAsString();
      RoomSlot actualRoomSlots = objectMapper.readValue(responseString, RoomSlot.class);
      assertEquals(actualRoomSlots, expectedRoomSlots);
    }
    
    @Test
    public void test_saveRoomSlot_unauthorizedIfNotAdmin() throws Exception {
        RoomSlot expectedRoomSlots = new RoomSlot(1L, "s21", "Wednesday", "8:00", "10:00");    
        ObjectMapper mapper = new ObjectMapper();    
        String requestBody = mapper.writeValueAsString(expectedRoomSlots);
          mockMvc.perform(post("/api/admin/roomslot").with(csrf()).contentType(MediaType.APPLICATION_JSON)
          .characterEncoding("utf-8").content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
              .andExpect(status().isUnauthorized());
    
        }

    //same here
    @Test
    public void testDeleteRoomSlot_RoomSlotExists() throws Exception {
      RoomSlot expectedRoomSlots = new RoomSlot(1L, "s21", "Wednesday", "8:00", "10:00");
      when(mockRoomSlotRepository.findById(1L)).thenReturn(Optional.of(expectedRoomSlots));
      when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
      MvcResult response = mockMvc
          .perform(delete("/api/admin/roomslot/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
              .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
          .andExpect(status().isNoContent()).andReturn();
      verify(mockRoomSlotRepository, times(1)).findById(expectedRoomSlots.getId());
      verify(mockRoomSlotRepository, times(1)).deleteById(expectedRoomSlots.getId());

      String responseString = response.getResponse().getContentAsString();

      assertEquals(responseString.length(), 0);
    }
    
    //same here
    @Test
    public void testDeleteRoomSlot_unauthorizedIfNotAdmin() throws Exception {
      mockMvc
          .perform(delete("/api/admin/roomslot/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
              .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
          .andExpect(status().isUnauthorized());
    }

    @Test
    public void testDeleteRoomSlot_slotNotFound() throws Exception {
        long id = 1L;
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockRoomSlotRepository.findById(id)).thenReturn(Optional.empty());
        mockMvc.perform(delete("/api/admin/roomslot/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isNotFound()).andReturn();
        verify(mockRoomSlotRepository, times(1)).findById(id);
        verify(mockRoomSlotRepository, times(0)).deleteById(id);
    }
}
