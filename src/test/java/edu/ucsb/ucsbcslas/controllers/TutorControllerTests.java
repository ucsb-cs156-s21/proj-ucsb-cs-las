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
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;

@WebMvcTest(value = TutorController.class)
@WithMockUser
public class TutorControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  TutorRepository mockTutorRepository;
  
  @MockBean
  AuthControllerAdvice mockAuthControllerAdvice;

  @MockBean
  CourseRepository mockCourseRepository;
  
  @MockBean
  TutorAssignmentRepository mockTutorAssignmentRepository;

  private String userToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
  }

  @Test
  public void testGetTutors() throws Exception {
    List<Tutor> expectedTutors = new ArrayList<Tutor>();
    expectedTutors.add(new Tutor(1L, "fname", "lname", "email"));
    when(mockTutorRepository.findAll()).thenReturn(expectedTutors);
    MvcResult response = mockMvc.perform(get("/api/member/tutors").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockTutorRepository, times(1)).findAll();

    String responseString = response.getResponse().getContentAsString();
    List<Tutor> actualTutors = objectMapper.readValue(responseString, new TypeReference<List<Tutor>>() {
    });
    assertEquals(actualTutors, expectedTutors);
  }

  @Test
  public void testGetASingleTutor() throws Exception {
    Tutor expectedTutor = new Tutor(1L, "fname", "lname", "email");
    // mockito is the library that allows us to do this when stuff
    when(mockTutorRepository.findById(1L)).thenReturn(Optional.of(expectedTutor));
    MvcResult response = mockMvc.perform(get("/api/member/tutors/1").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockTutorRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    Tutor actualTutor = objectMapper.readValue(responseString, Tutor.class);
    assertEquals(actualTutor, expectedTutor);
  }

  @Test
  public void testGetANonExistingTutor() throws Exception {
    when(mockTutorRepository.findById(99999L)).thenReturn(Optional.ofNullable(null));
    mockMvc.perform(get("/api/member/tutors/99999").contentType("application/json").header(HttpHeaders.AUTHORIZATION,
        "Bearer " + userToken())).andExpect(status().isNotFound());
  }

  @Test
  public void testSaveTutor() throws Exception {
    Tutor expectedTutor = new Tutor(1L, "fname", "lname", "email");
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(expectedTutor);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockTutorRepository.save(any())).thenReturn(expectedTutor);
    MvcResult response = mockMvc
        .perform(post("/api/admin/tutors").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isOk()).andReturn();

    verify(mockTutorRepository, times(1)).save(expectedTutor);

    String responseString = response.getResponse().getContentAsString();
    Tutor actualTutor = objectMapper.readValue(responseString, Tutor.class);
    assertEquals(actualTutor, expectedTutor);
  }

  @Test
  public void test_saveTutor_unauthorizedIfNotAdmin() throws Exception {
    Tutor expectedTutor = new Tutor(1L, "fname", "lname", "email");
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(expectedTutor);
    mockMvc
        .perform(post("/api/admin/tutors").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isUnauthorized());
  }

  @Test
  public void testUpdateTutor_tutorExists_updateValues() throws Exception {
    Tutor inputTutor = new Tutor(1L, "fname", "lname", "email");
    Tutor savedTutor = new Tutor(1L, "first name", "last name", "myemail");
    String body = objectMapper.writeValueAsString(inputTutor);

    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockTutorRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutor));
    when(mockTutorRepository.save(inputTutor)).thenReturn(inputTutor);
    MvcResult response = mockMvc
        .perform(put("/api/admin/tutors/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isOk()).andReturn();

    verify(mockTutorRepository, times(1)).findById(inputTutor.getId());
    verify(mockTutorRepository, times(1)).save(inputTutor);

    String responseString = response.getResponse().getContentAsString();

    assertEquals(body, responseString);
  }

  @Test
  public void testUpdateTutor_unauthorizedIfNotAdmin() throws Exception {
    Tutor inputTutor = new Tutor(1L, "fname", "lname", "email");
    String body = objectMapper.writeValueAsString(inputTutor);

    mockMvc
        .perform(put("/api/admin/tutors/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isUnauthorized());
  }

  @Test
  public void testUpdateTutor_tutorNotFound() throws Exception {
    Tutor inputTutor = new Tutor(1L, "fname", "lname", "email");
    String body = objectMapper.writeValueAsString(inputTutor);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockTutorRepository.findById(1L)).thenReturn(Optional.empty());
    mockMvc
        .perform(put("/api/admin/tutors/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockTutorRepository, times(1)).findById(1L);
    verify(mockTutorRepository, times(0)).save(any(Tutor.class));
  }

  @Test
  public void testUpdateTutor_tutorAtPathOwned_butTryingToOverwriteAnotherTutor() throws Exception {
    Tutor inputTutor = new Tutor(1L, "new tutor 1 trying to overwrite at id 1", "lname", "email");
    Tutor savedTutor = new Tutor(2L, "new tutor 1", "lname", "email");
    String body = objectMapper.writeValueAsString(inputTutor);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockTutorRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutor));
    mockMvc
        .perform(put("/api/admin/tutors/2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isBadRequest()).andReturn();
    verify(mockTutorRepository, times(1)).findById(2L);
    verify(mockTutorRepository, times(0)).save(any(Tutor.class));
  }

  @Test
  public void testDeleteTutor_tutorExists() throws Exception {
    Tutor expectedTutor = new Tutor(1L, "fname", "lname", "email");
    when(mockTutorRepository.findById(1L)).thenReturn(Optional.of(expectedTutor));
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    MvcResult response = mockMvc
        .perform(delete("/api/admin/tutors/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNoContent()).andReturn();
    verify(mockTutorRepository, times(1)).findById(expectedTutor.getId());
    verify(mockTutorRepository, times(1)).deleteById(expectedTutor.getId());

    String responseString = response.getResponse().getContentAsString();

    assertEquals(responseString.length(), 0);
  }

  @Test
  public void testDeleteTutor_unauthorizedIfNotAdmin() throws Exception {
    mockMvc
        .perform(delete("/api/admin/tutors/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isUnauthorized());
  }

  @Test
  public void testDeleteTutor_tutorNotFound() throws Exception {
    long id = 1L;
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockTutorRepository.findById(id)).thenReturn(Optional.empty());
    mockMvc
        .perform(delete("/api/admin/tutors/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockTutorRepository, times(1)).findById(id);
    verify(mockTutorRepository, times(0)).deleteById(id);
  }

}