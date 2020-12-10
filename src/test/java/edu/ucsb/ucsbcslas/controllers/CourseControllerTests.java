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
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;

@WebMvcTest(value = CourseController.class)
@WithMockUser
public class CourseControllerTests {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  CourseRepository mockCourseRepository;
  @MockBean
  AuthControllerAdvice mockAuthControllerAdvice;

  private String userToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
  }

  @Test
  public void testGetCourses() throws Exception {
    List<Course> expectedCourses = new ArrayList<Course>();
    expectedCourses.add(new Course(1L, "course 1", "F20", "fname", "lname", "email"));
    when(mockCourseRepository.findByQuarter("W21")).thenReturn(expectedCourses);
    MvcResult response = mockMvc.perform(get("/api/public/courses").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).findByQuarter("W21");

    String responseString = response.getResponse().getContentAsString();
    List<Course> actualCourses = objectMapper.readValue(responseString, new TypeReference<List<Course>>() {
    });
    assertEquals(actualCourses, expectedCourses);
  }

  @Test
  public void testGetASingleCourse() throws Exception {
    Course expectedCourse = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    // mockito is the library that allows us to do this when stuff
    when(mockCourseRepository.findById(1L)).thenReturn(Optional.of(expectedCourse));
    MvcResult response = mockMvc.perform(get("/api/public/courses/1").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).findById(1L);

    String responseString = response.getResponse().getContentAsString();
    Course actualCourse = objectMapper.readValue(responseString, Course.class);
    assertEquals(actualCourse, expectedCourse);
  }

  @Test
  public void testGetANonExistingCourse() throws Exception {
    when(mockCourseRepository.findById(99999L)).thenReturn(Optional.ofNullable(null));
    mockMvc.perform(get("/api/public/courses/99999").contentType("application/json").header(HttpHeaders.AUTHORIZATION,
        "Bearer " + userToken())).andExpect(status().isNotFound());
  }

  @Test
  public void testSaveCourse() throws Exception {
    Course expectedCourse = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(expectedCourse);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockCourseRepository.save(any())).thenReturn(expectedCourse);
    MvcResult response = mockMvc
        .perform(post("/api/admin/courses").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).save(expectedCourse);

    String responseString = response.getResponse().getContentAsString();
    Course actualCourse = objectMapper.readValue(responseString, Course.class);
    assertEquals(actualCourse, expectedCourse);
  }

  @Test
  public void test_saveCourse_unauthorizedIfNotAdmin() throws Exception {
    Course expectedCourse = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(expectedCourse);
    mockMvc
        .perform(post("/api/admin/courses").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isUnauthorized());
  }

  @Test
  public void testUpdateCourse_courseExists_updateValues() throws Exception {
    Course inputCourse = new Course(1L, "new course 1", "F20", "fname", "lname", "email");
    Course savedCourse = new Course(1L, "old course 1", "W21", "first name", "last name", "myemail");
    String body = objectMapper.writeValueAsString(inputCourse);

    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockCourseRepository.findById(any(Long.class))).thenReturn(Optional.of(savedCourse));
    when(mockCourseRepository.save(inputCourse)).thenReturn(inputCourse);
    MvcResult response = mockMvc
        .perform(put("/api/admin/courses/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).findById(inputCourse.getId());
    verify(mockCourseRepository, times(1)).save(inputCourse);

    String responseString = response.getResponse().getContentAsString();

    assertEquals(body, responseString);
  }

  @Test
  public void testUpdateCourse_unauthorizedIfNotAdmin() throws Exception {
    Course inputCourse = new Course(1L, "new course 1", "F20", "fname", "lname", "email");
    String body = objectMapper.writeValueAsString(inputCourse);

    mockMvc
        .perform(put("/api/admin/courses/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isUnauthorized());
  }

  @Test
  public void testUpdateCourse_courseNotFound() throws Exception {
    Course inputCourse = new Course(1L, "new course 1", "F20", "fname", "lname", "email");
    String body = objectMapper.writeValueAsString(inputCourse);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockCourseRepository.findById(1L)).thenReturn(Optional.empty());
    mockMvc
        .perform(put("/api/admin/courses/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockCourseRepository, times(1)).findById(1L);
    verify(mockCourseRepository, times(0)).save(any(Course.class));
  }

  @Test
  public void testUpdateCourse_courseAtPathOwned_butTryingToOverwriteAnotherCourse() throws Exception {
    Course inputCourse = new Course(1L, "new course 1 trying to overwrite at id 1", "F20", "fname", "lname", "email");
    Course savedCourse = new Course(2L, "new course 1", "F20", "fname", "lname", "email");
    String body = objectMapper.writeValueAsString(inputCourse);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockCourseRepository.findById(any(Long.class))).thenReturn(Optional.of(savedCourse));
    mockMvc
        .perform(put("/api/admin/courses/2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isBadRequest()).andReturn();
    verify(mockCourseRepository, times(1)).findById(2L);
    verify(mockCourseRepository, times(0)).save(any(Course.class));
  }

  @Test
  public void testDeleteCourse_courseExists() throws Exception {
    Course expectedCourse = new Course(1L, "new course 1", "F20", "fname", "lname", "email");
    when(mockCourseRepository.findById(1L)).thenReturn(Optional.of(expectedCourse));
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    MvcResult response = mockMvc
        .perform(delete("/api/admin/courses/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNoContent()).andReturn();
    verify(mockCourseRepository, times(1)).findById(expectedCourse.getId());
    verify(mockCourseRepository, times(1)).deleteById(expectedCourse.getId());

    String responseString = response.getResponse().getContentAsString();

    assertEquals(responseString.length(), 0);
  }

  @Test
  public void testDeleteCourse_unauthorizedIfNotAdmin() throws Exception {
    mockMvc
        .perform(delete("/api/admin/courses/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isUnauthorized());
  }

  @Test
  public void testDeleteCourse_courseNotFound() throws Exception {
    long id = 1L;
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockCourseRepository.findById(id)).thenReturn(Optional.empty());
    mockMvc
        .perform(delete("/api/admin/courses/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isNotFound()).andReturn();
    verify(mockCourseRepository, times(1)).findById(id);
    verify(mockCourseRepository, times(0)).deleteById(id);
  }

}
