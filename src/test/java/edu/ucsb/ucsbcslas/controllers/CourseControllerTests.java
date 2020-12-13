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
import java.util.Map;
import java.util.HashMap;
import com.fasterxml.jackson.core.type.TypeReference;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;

import edu.ucsb.ucsbcslas.entities.AppUser;

import edu.ucsb.ucsbcslas.repositories.OnlineOfficeHoursRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;
import edu.ucsb.ucsbcslas.models.TutorAssignmentOfficeHourView;
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;

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

  @MockBean
  TutorAssignmentRepository mockTutorAssignmentRepository;
  @MockBean
  OnlineOfficeHoursRepository mockOnlineOfficeHoursRepository;

  private String userToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
  }

  @Test
  public void testGetCourses() throws Exception {
    List<Course> expectedCourses = new ArrayList<Course>();
    expectedCourses.add(new Course(1L, "course 1", "F20", "fname", "lname", "email"));
    when(mockCourseRepository.findAll()).thenReturn(expectedCourses);
    MvcResult response = mockMvc.perform(get("/api/public/courses").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).findAll();

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
  public void testErrorOnDuplicateSave() throws Exception {
    Course expectedCourse = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Map<String, String> expectedResponse = new HashMap<String, String>();
    expectedResponse.put("error", String.format("Course titled %s already exists for quarter %s.", expectedCourse.getName(), expectedCourse.getQuarter()));
    ObjectMapper mapper = new ObjectMapper();
    String requestBody = mapper.writeValueAsString(expectedCourse);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    when(mockCourseRepository.findByNameAndQuarter("course 1", "F20")).thenReturn(expectedCourse);
    MvcResult response = mockMvc
        .perform(post("/api/admin/courses").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).findByNameAndQuarter("course 1", "F20");

    String responseString = response.getResponse().getContentAsString();
    Map<String, String> actualResponse = mapper.readValue(responseString, new TypeReference<Map<String,String>>() {});
    assertEquals(expectedResponse, actualResponse);
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

  @Test
  public void testGetMyCourses() throws Exception {
    List<Course> expectedCourses = new ArrayList<Course>();
    expectedCourses.add(new Course(1L, "course 1", "F20", "fname", "lname", "email"));
    when(mockCourseRepository.findAll()).thenReturn(expectedCourses);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    MvcResult response = mockMvc.perform(get("/api/member/courses").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).findAll();

    String responseString = response.getResponse().getContentAsString();
    List<Course> actualCourses = objectMapper.readValue(responseString, new TypeReference<List<Course>>() {
    });
    assertEquals(actualCourses, expectedCourses);
  }

  @Test
  public void testGetMyCourses_notFound() throws Exception {
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
    mockMvc.perform(get("/api/member/courses").contentType("application/json")
      .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
  }

  @Test
  public void testGetMyCourses_notAdmin() throws Exception {
    List<Course> expectedCourses = new ArrayList<Course>();
    expectedCourses.add(new Course(1L, "course 1", "F20", "fname", "lname", "email"));
    when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
    AppUser user = new AppUser(1L, "email", "Chris", "Gaucho");
    when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
    MvcResult response = mockMvc.perform(get("/api/member/courses").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).findAllByInstructorEmail("email");

    String responseString = response.getResponse().getContentAsString();
    List<Course> actualCourses = objectMapper.readValue(responseString, new TypeReference<List<Course>>() {
    });
    assertEquals(actualCourses, expectedCourses);
  }


  @Test
  public void testGetMyCoursesUnauthorized() throws Exception {
    List<Course> expectedCourses = new ArrayList<Course>();
    when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);
    when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
    AppUser user = new AppUser(1L, "email", "Chris", "Gaucho");
    when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
    mockMvc.perform(get("/api/member/courses").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isUnauthorized());
  }

  @Test
  public void testGetMyCoursesInstructor() throws Exception {
    List<Course> expectedCourses = new ArrayList<Course>();
    expectedCourses.add(new Course(1L, "course 1", "F20", "fname", "lname", "email"));
    when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);
    when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
    MvcResult response = mockMvc.perform(get("/api/member/courses/forInstructor/email").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    verify(mockCourseRepository, times(1)).findAllByInstructorEmail("email");

    String responseString = response.getResponse().getContentAsString();
    List<Course> actualCourses = objectMapper.readValue(responseString, new TypeReference<List<Course>>() {
    });
    assertEquals(actualCourses, expectedCourses);
  }

  @Test
  public void testGetMyCoursesInstructorUnauthorized() throws Exception {
    mockMvc.perform(get("/api/member/courses/forInstructor/email").contentType("application/json")
    .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isUnauthorized());
  }

  @Test
  public void testShowMemberCourseAuthorized() throws Exception {
    List<TutorAssignmentOfficeHourView> expectedViewList = new ArrayList<>();
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    List<TutorAssignment> expectedTutorAssignmentsList = new ArrayList<>();
  
    Optional <Course> expectedCourses = Optional.empty();
    Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L, c, t, "TA");
    expectedTutorAssignmentsList.add(expectedTutorAssignments);

    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, "Tuesday", "4:00 PM", "6:00 PM", "https://ucsb.zoom.us/j/92714889391?pwd=dXlaVTFUS1NuNm5xL0NMUUFjRDVndz09", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView expectedView_1 = new TutorAssignmentOfficeHourView(expectedTutorAssignments, expectedOnlineOfficeHoursList);
    expectedViewList.add(expectedView_1);


    AppUser user = new AppUser(1L, "email", "Chris", "Gaucho");
    // when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
    when(mockTutorAssignmentRepository.findAllByCourse(c)).thenReturn(expectedTutorAssignmentsList);
    when(mockCourseRepository.findById(1L)).thenReturn(Optional.of(c));
    when(mockOnlineOfficeHoursRepository.findAllByTutorAssignment(expectedTutorAssignments)).thenReturn(expectedOnlineOfficeHoursList);
    when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
    MvcResult response = mockMvc.perform(get("/api/member/courses/show/1").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

    
    String responseString = response.getResponse().getContentAsString();
    List<TutorAssignmentOfficeHourView> actualviewList = objectMapper.readValue(responseString, new TypeReference<List<TutorAssignmentOfficeHourView>>() {
    });
    assertEquals(actualviewList, expectedViewList);
  }
 
  @Test
  public void testShowCourseUnauthorized() throws Exception {
    List<TutorAssignmentOfficeHourView> expectedViewList = new ArrayList<>();
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    List<TutorAssignment> expectedTutorAssignmentsList = new ArrayList<>();

    Optional <Course> expectedCourses = Optional.empty();
    Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L, c, t, "TA");
    expectedTutorAssignmentsList.add(expectedTutorAssignments);

    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, "Tuesday", "4:00 PM",
        "6:00 PM", "https://ucsb.zoom.us/j/92714889391?pwd=dXlaVTFUS1NuNm5xL0NMUUFjRDVndz09",
        "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView expectedView_1 = new TutorAssignmentOfficeHourView(expectedTutorAssignments,
        expectedOnlineOfficeHoursList);
    expectedViewList.add(expectedView_1);

    for (TutorAssignmentOfficeHourView temp : expectedViewList) {
      List<OnlineOfficeHours> officeHourList = temp.getOnlineOfficeHours();
      temp.getTutorAssignment().getTutor().setEmail(null);
      for (OnlineOfficeHours tempo : officeHourList) {
        tempo.setZoomRoomLink(null);
      }
    }

    AppUser user = new AppUser(1L, "email", "Chris", "Gaucho");
    when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
    when(mockTutorAssignmentRepository.findAllByCourse(c)).thenReturn(expectedTutorAssignmentsList);
    when(mockCourseRepository.findById(1L)).thenReturn(Optional.of(c));
    when(mockOnlineOfficeHoursRepository.findAllByTutorAssignment(expectedTutorAssignments))
        .thenReturn(expectedOnlineOfficeHoursList);
    when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(false);
    MvcResult response = mockMvc.perform(get("/api/public/courses/show/1").contentType("application/json")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn(); 

    String responseString = response.getResponse().getContentAsString();
    List<TutorAssignmentOfficeHourView> actualviewList = objectMapper.readValue(responseString,
        new TypeReference<List<TutorAssignmentOfficeHourView>>() {
        });
    assertEquals(actualviewList, expectedViewList);
    
  }

  @Test
  public void testShowPublicCourseNoCourse() throws Exception {
     when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(false);
    mockMvc.perform(get("/api/public/courses/show/1").contentType("application/json")
      .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
  }

  @Test
  public void testshowMemberCourseUnthorized() throws Exception {
    mockMvc.perform(get("/api/member/courses/show/1").contentType("application/json")
    .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isUnauthorized());
  }

  @Test
  public void testshowMemberCourseNoCourse() throws Exception {
    when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
    mockMvc.perform(get("/api/member/courses/show/1").contentType("application/json")
      .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
  }
}