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

// Imports from BZ when implementing uploading CSV functionality to Tutor Assignment
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.servlet.View;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import org.mockito.Mock;
import org.junit.Ignore;
import java.io.IOException;
import java.io.Reader;
import edu.ucsb.ucsbcslas.services.CSVToObjectService;
import edu.ucsb.ucsbcslas.models.TutorAssignmentModel;

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
import java.util.Set;
import java.util.Map;
import java.util.HashMap;
import java.util.HashSet;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;

import edu.ucsb.ucsbcslas.entities.AppUser;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import jdk.jfr.Timestamp;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;

@WebMvcTest(value = TutorAssignmentController.class)
@WithMockUser
public class TutorAssignmentControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    TutorAssignmentRepository mockTutorAssignmentRepository;

    @MockBean
    CourseRepository mockCourseRepository;

    @MockBean
    TutorRepository mockTutorRepository;

    @MockBean
    AuthControllerAdvice mockAuthControllerAdvice;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    CSVToObjectService mockCSVToObjectService;

    @Mock
    Reader mockReader;

    private String userToken() {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
    }

    @Test
    public void testGetTutorAssignments_Admin() throws Exception {
        List<TutorAssignment> expectedTutorAssignments = new ArrayList<TutorAssignment>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorAssignments.add(new TutorAssignment(1L, c, t, "TA"));
        when(mockTutorAssignmentRepository.findAll()).thenReturn(expectedTutorAssignments);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        MvcResult response = mockMvc
                .perform(get("/api/member/tutorAssignments").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).findAll();

        String responseString = response.getResponse().getContentAsString();
        List<TutorAssignment> actualTutorAssignments = objectMapper.readValue(responseString,
                new TypeReference<List<TutorAssignment>>() {
                });
        assertEquals(actualTutorAssignments, expectedTutorAssignments);
    }

    @Test
    public void testGetTutorAssignments_Admin_notFound() throws Exception {
        List<TutorAssignment> expectedTutorAssignments = new ArrayList<TutorAssignment>();
        when(mockTutorAssignmentRepository.findAll()).thenReturn(expectedTutorAssignments);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        mockMvc.perform(get("/api/member/tutorAssignments").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testGetTutorAssignments_Instructor() throws Exception {
        List<TutorAssignment> expectedTutorAssignments = new ArrayList<TutorAssignment>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor();
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        expectedTutorAssignmentss.add(c);
        expectedTutorAssignments.add(new TutorAssignment(1L, c, t, "TA"));
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockTutorAssignmentRepository.findAllByCourse(c)).thenReturn(expectedTutorAssignments);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        when(mockCourseRepository.findById(1L)).thenReturn(Optional.of(c));
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        MvcResult response = mockMvc
                .perform(get("/api/member/tutorAssignments").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).findAllByCourse(c);
        verify(mockCourseRepository, times(1)).findAllByInstructorEmail(anyString());
        verify(mockCourseRepository, times(1)).findById(1L);

        String responseString = response.getResponse().getContentAsString();
        List<TutorAssignment> actualTutorAssignments = objectMapper.readValue(responseString,
                new TypeReference<List<TutorAssignment>>() {
                });
        assertEquals(actualTutorAssignments, expectedTutorAssignments);
    }

    @Test
    public void testGetTutorAssignments_Instructor_notFound() throws Exception {
        List<TutorAssignment> expectedTutorAssignments = new ArrayList<TutorAssignment>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        expectedTutorAssignmentss.add(c);
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockTutorAssignmentRepository.findAllByCourse(c)).thenReturn(expectedTutorAssignments);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        when(mockCourseRepository.findById(1L)).thenReturn(Optional.of(c));
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        mockMvc.perform(get("/api/member/tutorAssignments").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testGetTutorAssignments_Instructor_NotPresent() throws Exception {
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        expectedTutorAssignmentss.add(c);
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        when(mockCourseRepository.findById(1L)).thenReturn(Optional.empty());
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(false);
        mockMvc.perform(get("/api/member/tutorAssignments").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testGetTutorAssignments_Member() throws Exception {
        List<TutorAssignment> expectedTutorAssignments = new ArrayList<TutorAssignment>();
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorAssignments.add(new TutorAssignment(1L, c, t, "TA"));
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockTutorAssignmentRepository.findAllByTutor(t)).thenReturn(expectedTutorAssignments);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        when(mockTutorRepository.findByEmail("email")).thenReturn(Optional.of(t));
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        MvcResult response = mockMvc
                .perform(get("/api/member/tutorAssignments").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).findAllByTutor(t);
        verify(mockCourseRepository, times(1)).findAllByInstructorEmail(anyString());
        verify(mockTutorRepository, times(1)).findByEmail("email");

        String responseString = response.getResponse().getContentAsString();
        List<TutorAssignment> actualTutorAssignments = objectMapper.readValue(responseString,
                new TypeReference<List<TutorAssignment>>() {
                });
        assertEquals(actualTutorAssignments, expectedTutorAssignments);
    }

    @Test
    public void testGetTutorAssignments_Member_notFound() throws Exception {
        List<TutorAssignment> expectedTutorAssignments = new ArrayList<TutorAssignment>();
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockTutorAssignmentRepository.findAllByTutor(t)).thenReturn(expectedTutorAssignments);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        when(mockTutorRepository.findByEmail("email")).thenReturn(Optional.of(t));
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        mockMvc.perform(get("/api/member/tutorAssignments").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testGetTutorAssignments_Member_NotPresent() throws Exception {
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        when(mockTutorRepository.findByEmail("email")).thenReturn(Optional.empty());
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        mockMvc.perform(get("/api/member/tutorAssignments").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testGetTutorAssignments_Unauthorized() throws Exception {
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(false);
        mockMvc.perform(get("/api/member/tutorAssignments").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isUnauthorized());
    }

    @Test
    public void testSaveTutorAssignment_Unauthorized() throws Exception {
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203',"
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, assignmentType: 'TA'}";
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        mockMvc.perform(post("/api/member/tutorAssignments").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").content(requestBody)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isUnauthorized());
    }

    @Test
    public void testSaveTutorAssignment_BadRequest() throws Exception {
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203', "
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, assignmentType: 'TA'}";
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.empty());
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        mockMvc.perform(post("/api/member/tutorAssignments").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").content(requestBody)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isBadRequest());
    }

    @Test
    public void testSaveTutorAssignment_Admin() throws Exception {
        Course c = new Course(2L, "CMPSC 148", "20203", "Chandra", "Krintz", "krintz@example.org");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        TutorAssignment expectedTutorAssignment = new TutorAssignment(null, c, t, "TA");
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203',"
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, assignmentType: 'TA'}";
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockTutorAssignmentRepository.save(any())).thenReturn(expectedTutorAssignment);
        MvcResult response = mockMvc
                .perform(post("/api/member/tutorAssignments").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8").content(requestBody)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).save(expectedTutorAssignment);

        String responseString = response.getResponse().getContentAsString();
        TutorAssignment actualTutorAssignment = objectMapper.readValue(responseString, TutorAssignment.class);
        assertEquals(actualTutorAssignment, expectedTutorAssignment);
    }

    @Test
    public void testSaveTutorAssignment_Instructor() throws Exception {
        List<Course> expectedTutorAssignmentss = new ArrayList<Course>();
        Course c = new Course(2L, "CMPSC 148", "20203", "Chandra", "Krintz", "krintz@example.org");
        expectedTutorAssignmentss.add(c);
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        TutorAssignment expectedTutorAssignment = new TutorAssignment(null, c, t, "TA");
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203',"
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, assignmentType: 'TA'}";
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedTutorAssignmentss);
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockTutorAssignmentRepository.save(any())).thenReturn(expectedTutorAssignment);
        MvcResult response = mockMvc
                .perform(post("/api/member/tutorAssignments").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8").content(requestBody)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).save(expectedTutorAssignment);

        String responseString = response.getResponse().getContentAsString();
        TutorAssignment actualTutorAssignment = objectMapper.readValue(responseString, TutorAssignment.class);
        assertEquals(actualTutorAssignment, expectedTutorAssignment);
    }

    @Test
    public void testGetASingleTutorAssignment() throws Exception {
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "fname", "lname", "email@ucsb.edu");
        TutorAssignment expectedTutorAssignment = new TutorAssignment(1L, c, t, "TA");

        // mockito is the library that allows us to do this when stuff
        when(mockTutorAssignmentRepository.findById(1L)).thenReturn(Optional.of(expectedTutorAssignment));
        MvcResult response = mockMvc
                .perform(get("/api/member/tutorAssignments/1").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).findById(1L);

        String responseString = response.getResponse().getContentAsString();
        TutorAssignment actualTutorAssignment = objectMapper.readValue(responseString, TutorAssignment.class);
        assertEquals(actualTutorAssignment, expectedTutorAssignment);
    }

    @Test
    public void testGetANonExistingCourse() throws Exception {
        when(mockTutorAssignmentRepository.findById(99999L)).thenReturn(Optional.ofNullable(null));
        mockMvc.perform(get("/api/member/tutorAssignments/99999").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateTutorAssignments_tutorAssignmentExists_updateValues() throws Exception {

        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        Course c2 = new Course(2L, "course 2", "20203", "fname", "lname", "email");
        Tutor t2 = new Tutor(2L, "fname2", "lname2", "email2@ucsb.edu");

        TutorAssignment inputTutorAssignment = new TutorAssignment(1L, c1, t, "TA");
        TutorAssignment savedTutorAssignment = new TutorAssignment(1L, c2, t2, "LA");

        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'course 1', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'instr@ucsb.edu'}, assignmentType: 'TA'}";

        String body = objectMapper.writeValueAsString(inputTutorAssignment);

        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorAssignmentRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutorAssignment));
        when(mockTutorAssignmentRepository.save(inputTutorAssignment)).thenReturn(inputTutorAssignment);
        MvcResult response = mockMvc.perform(put("/api/member/tutorAssignments/1").with(csrf())
                .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(requestBody))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).findById(inputTutorAssignment.getId());
        verify(mockTutorAssignmentRepository, times(1)).save(inputTutorAssignment);

        String responseString = response.getResponse().getContentAsString();

        assertEquals(body, responseString);
    }

    @Test
    public void testUpdateTutorAssignments_tutorAssignmentExists_updateValuesForSameTutor() throws Exception {

        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        Course c2 = new Course(2L, "course 2", "20203", "fname", "lname", "email");

        TutorAssignment inputTutorAssignment = new TutorAssignment(1L, c1, t, "TA");
        TutorAssignment savedTutorAssignment = new TutorAssignment(1L, c2, t, "LA");

        String requestBody = "{tutor:  {email: 'scottpchow@ucsb.edu', firstName: 'Scott', id: '1', lastName: 'Chow'}, "
                + "tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'course 1', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'instr@ucsb.edu'}, assignmentType: 'TA'}";

        String body = objectMapper.writeValueAsString(inputTutorAssignment);

        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorAssignmentRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutorAssignment));
        when(mockTutorAssignmentRepository.save(inputTutorAssignment)).thenReturn(inputTutorAssignment);
        MvcResult response = mockMvc.perform(put("/api/member/tutorAssignments/1").with(csrf())
                .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(requestBody))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).findById(inputTutorAssignment.getId());
        verify(mockTutorAssignmentRepository, times(1)).save(inputTutorAssignment);

        String responseString = response.getResponse().getContentAsString();

        assertEquals(body, responseString);
    }

    @Test
    public void testUpdateTutorAssignment_unauthorizedIfNotAdmin() throws Exception {
        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");

        TutorAssignment inputTutorAssignment = new TutorAssignment(1L, c1, t, "TA");

        String body = objectMapper.writeValueAsString(inputTutorAssignment);

        mockMvc.perform(put("/api/member/tutorAssignments/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testUpdateTutorAssignment_tutorAssignmentNotFound() throws Exception {
        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");

        TutorAssignment inputTutorAssignment = new TutorAssignment(1L, c1, t, "TA");

        String body = objectMapper.writeValueAsString(inputTutorAssignment);

        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorAssignmentRepository.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/member/tutorAssignments/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
                .andExpect(status().isNotFound()).andReturn();
        verify(mockTutorAssignmentRepository, times(1)).findById(1L);
        verify(mockTutorAssignmentRepository, times(0)).save(any(TutorAssignment.class));
    }

    @Test
    public void testUpdateTutorAssignment_TutorIsNotPresent() throws Exception {

        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        Course c2 = new Course(2L, "course 2", "20203", "fname", "lname", "email");
        Tutor t2 = new Tutor(2L, "fname2", "lname2", "scottpchow@ucsb.edu");
        Tutor t3 = new Tutor();

        TutorAssignment inputTutorAssignment = new TutorAssignment(1L, c1, t, "TA");
        TutorAssignment savedTutorAssignment = new TutorAssignment(2L, c2, t, "LA");

        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'course 1', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'instr@ucsb.edu'}, assignmentType: 'TA'}";

        String requestBody2 = "{tutorEmail: 'email2@ucsb.edu', course:  {name: 'course 2', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'email'}, assignmentType: 'LA'}";

        String body = objectMapper.writeValueAsString(inputTutorAssignment);

        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t3));

        when(mockTutorAssignmentRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutorAssignment));
        mockMvc.perform(put("/api/member/tutorAssignments/2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
                .content(requestBody2)).andExpect(status().isBadRequest());
    }

    @Test
    public void testGetTutorAssignmentByCourseID() throws Exception {
        List<TutorAssignment> expectedTutorAssignments = new ArrayList<TutorAssignment>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorAssignments.add(new TutorAssignment(1L, c, t, "TA"));
        // mockito is the library that allows us to do this when stuf
        when(mockTutorAssignmentRepository.findAllByCourseId(1L)).thenReturn((expectedTutorAssignments));
        MvcResult response = mockMvc
                .perform(get("/api/public/tutorAssignment/1").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).findAllByCourseId(1L);

        String responseString = response.getResponse().getContentAsString();
        List<TutorAssignment> actualTA = objectMapper.readValue(responseString,
                new TypeReference<List<TutorAssignment>>() {
                });
        assertEquals(actualTA, expectedTutorAssignments);

    }

    @Test
    public void testGetTutorAssignmentByTutor() throws Exception {
        List<TutorAssignment> expectedTutorAssignments = new ArrayList<TutorAssignment>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorAssignments.add(new TutorAssignment(1L, c, t, "TA"));

        // mockito is the library that allows us to do this when stuf
        when(mockTutorRepository.findByEmail("vanbrocklin@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorAssignmentRepository.findAllByTutor(t)).thenReturn(expectedTutorAssignments);

        MvcResult response = mockMvc
                .perform(get("/api/member/tutorAssignment/byTutor/vanbrocklin@ucsb.edu").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorRepository, times(1)).findByEmail("vanbrocklin@ucsb.edu");
        verify(mockTutorAssignmentRepository, times(1)).findAllByTutor(t);

        String responseString = response.getResponse().getContentAsString();
        List<TutorAssignment> actualTA = objectMapper.readValue(responseString,
                new TypeReference<List<TutorAssignment>>() {
                });
        assertEquals(actualTA, expectedTutorAssignments);

    }

    @Test
    public void testGetCourse() throws Exception {
        List<TutorAssignment> expectedTutorAssignment = new ArrayList<TutorAssignment>();
        List<TutorAssignment> resultingTutorAssignment = new ArrayList<TutorAssignment>();
        Course c1 = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Course c2 = new Course(2L, "course 2", "S20", "fname", "lname", "email");
        Tutor t1 = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        Tutor t2 = new Tutor(2L, "Au", "Go", "AuGo@ucsb.edu");
        resultingTutorAssignment.add(new TutorAssignment(1L, c1, t1, "TA"));
        resultingTutorAssignment.add(new TutorAssignment(2L, c2, t2, "TA"));

        expectedTutorAssignment.add(new TutorAssignment(1L, c1, t1, "TA"));

        when(mockTutorAssignmentRepository.findAll()).thenReturn((resultingTutorAssignment));
        MvcResult response = mockMvc
                .perform(get("/api/public/tutorAssignment/byCourseNumber/course 1").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();
        verify(mockTutorAssignmentRepository, times(1)).findAll();
        // for in list get name course
        // for loop
        String responseString = response.getResponse().getContentAsString();
        List<TutorAssignment> actualTutorAssignment = objectMapper.readValue(responseString,
                new TypeReference<List<TutorAssignment>>() {
                });
        assertEquals(actualTutorAssignment, expectedTutorAssignment);
    }

    @Test
    public void testGetCourseNumbers() throws Exception {
        List<Course> expectedCourses = new ArrayList<Course>();
        Course c = new Course(2L, "CMPSC 148", "20203", "Chandra", "Krintz", "krintz@example.org");
        expectedCourses.add(c);
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        TutorAssignment ta = new TutorAssignment(null, c, t, "TA");
        List<TutorAssignment> expectedTutorAssignment = new ArrayList<TutorAssignment>();
        expectedTutorAssignment.add(ta);
        Set<String> expectedCourseNumbers = new HashSet<String>();
        expectedCourseNumbers.add(ta.getCourse().getName());

        when(mockTutorAssignmentRepository.findAll()).thenReturn((expectedTutorAssignment));
        MvcResult response = mockMvc
                .perform(get("/api/public/tutorAssignment/course_numbers").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorAssignmentRepository, times(1)).findAll();

        String responseString = response.getResponse().getContentAsString();
        Set<String> actualCourseNumber = objectMapper.readValue(responseString, new TypeReference<Set<String>>() {
        });
        assertEquals(actualCourseNumber, expectedCourseNumbers);
    }

    // This test currently passes

    @Test
    public void testUploadFileThrowsRuntime() throws Exception {
        // TutorAssignmentController tutorAssignmentController =
        // mock(TutorAssignmentController.class);
        when(mockCSVToObjectService.parse(any(Reader.class), eq(TutorAssignment.class)))
                .thenThrow(RuntimeException.class);
        MockMultipartFile mockFile = new MockMultipartFile("csv", "test.csv", MediaType.TEXT_PLAIN_VALUE,
                "value,done\ntodo,false".getBytes());
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        MvcResult response = mockMvc
                .perform(multipart("/api/member/tutorAssignments/upload").file(mockFile)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isBadRequest()).andReturn();

        verify(mockTutorAssignmentRepository, never()).saveAll(any());
    }

    @Test
    public void testUploadFile() throws Exception {
        List<TutorAssignmentModel> expectedTutorAssignmentModel = new ArrayList<TutorAssignmentModel>();
        expectedTutorAssignmentModel.add(new TutorAssignmentModel("CMPSC 48", "20201", "Joe", "Gaucho",
                "joegaucho@ucsb.edu", "Joe", "Gaucho", "joegaucho@ucsb.edu", "LA"));
        Course testCour = new Course("CMPSC 48", "20201", "Joe", "Gaucho", "joegaucho@ucsb.edu");
        Tutor testTut = new Tutor("Joe", "Gaucho", "joegaucho@ucsb.edu");
        TutorAssignment testTutorAssignment = new TutorAssignment(testCour, testTut, "LA");
        when(mockCSVToObjectService.parse(any(Reader.class), eq(TutorAssignmentModel.class)))
                .thenReturn(expectedTutorAssignmentModel);
        MockMultipartFile mockFile = new MockMultipartFile("csv", "test.csv", MediaType.TEXT_PLAIN_VALUE,
                "value,done\ntodo,false".getBytes());
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        MvcResult response = mockMvc
                .perform(multipart("/api/member/tutorAssignments/upload").file(mockFile)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer" + userToken()))
                .andExpect(status().isOk()).andReturn();
        verify(mockTutorAssignmentRepository, times(1)).save(testTutorAssignment);
        verify(mockTutorRepository, times(1)).save(testTut);
        verify(mockCourseRepository, times(1)).save(testCour);

    }

}
