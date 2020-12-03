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

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.ActiveQuarter;
import edu.ucsb.ucsbcslas.repositories.ActiveQuarterRepository;

@WebMvcTest(value = ActiveQuarterController.class)
@WithMockUser
public class ActiveQuarterControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  ActiveQuarterRepository mockQuarterRepo;
  @MockBean
  AuthControllerAdvice mockAuthControllerAdvice;

  private String userToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
  }

  @Test
  public void testGetActiveQuarters() throws Exception {
    List<ActiveQuarter> expectedActiveQuarters = new ArrayList<ActiveQuarter>();
    expectedActiveQuarters.add(new ActiveQuarter(1L, "f20)"));
    when(mockQuarterRepo.findAll()).thenReturn(expectedActiveQuarters);
    MvcResult response = mockMvc.perform(get("/api/public/filter").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockQuarterRepo, times(1)).findAll();

    String responseString = response.getResponse().getContentAsString();
    List<ActiveQuarter> actualActiveQuarters = objectMapper.readValue(responseString,
        new TypeReference<List<ActiveQuarter>>() {
        });
    System.out.println(actualActiveQuarters.toString());
    assertEquals(actualActiveQuarters, expectedActiveQuarters);
  }

  @Test
  public void testDeleteCourse_courseExists() throws Exception {
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    MvcResult response = mockMvc
        .perform(delete("/api/admin/filter/nuke").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNoContent()).andReturn();

    String responseString = response.getResponse().getContentAsString();

    assertEquals(responseString.length(), 0);
  }
}
