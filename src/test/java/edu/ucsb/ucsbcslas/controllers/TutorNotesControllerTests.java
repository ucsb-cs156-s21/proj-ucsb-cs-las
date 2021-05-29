package edu.ucsb.ucsbcslas.controllers;
import edu.ucsb.ucsbcslas.entities.AppUser;
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
import java.util.Set;
import java.util.Map;
import java.util.HashMap;
import java.util.HashSet;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.TutorNotes;
import edu.ucsb.ucsbcslas.repositories.TutorNotesRepository;

import edu.ucsb.ucsbcslas.entities.AppUser;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import jdk.jfr.Timestamp;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;

@WebMvcTest(value = TutorNotesController.class)
@WithMockUser
public class TutorNotesControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    TutorNotesRepository mockTutorNotesRepository;

    @MockBean
    CourseRepository mockCourseRepository;

    @MockBean
    TutorRepository mockTutorRepository;

    @MockBean
    AuthControllerAdvice mockAuthControllerAdvice;
    private String userToken() {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
    }

    @Test
    public void testGetTutorNotes_Admin() throws Exception {
        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorNotes.add(new TutorNotes(1L, c, t, "TA"));
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockTutorNotesRepository.findAll()).thenReturn(expectedTutorNotes);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        MvcResult response = mockMvc.perform(get("/api/member/tutorNotes").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).findAll();

        String responseString = response.getResponse().getContentAsString();
        List<TutorNotes> actualTutorNotes = objectMapper.readValue(responseString,
                new TypeReference<List<TutorNotes>>() {
                });
        assertEquals(actualTutorNotes, expectedTutorNotes);
    }

    @Test
    public void testGetTutorNotes_Admin_notFound() throws Exception {
        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockTutorNotesRepository.findAll()).thenReturn(expectedTutorNotes);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        mockMvc.perform(get("/api/member/tutorNotes").contentType("application/json").header(HttpHeaders.AUTHORIZATION,
                "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testGetTutorNotes_Instructor() throws Exception {
        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor();
        List<Course> expectedCourses = new ArrayList<Course>();
        expectedCourses.add(c);
        expectedTutorNotes.add(new TutorNotes(1L, c, t, "TA"));
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockTutorNotesRepository.findAllByCourse(c)).thenReturn(expectedTutorNotes);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);
        when(mockCourseRepository.findById(1L)).thenReturn(Optional.of(c));
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        MvcResult response = mockMvc.perform(get("/api/member/tutorNotes").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).findAllByCourse(c);
        verify(mockCourseRepository, times(1)).findAllByInstructorEmail(anyString());
        verify(mockCourseRepository, times(1)).findById(1L);

        String responseString = response.getResponse().getContentAsString();
        List<TutorNotes> actualTutorNotes = objectMapper.readValue(responseString,
                new TypeReference<List<TutorNotes>>() {
                });
        assertEquals(actualTutorNotes, expectedTutorNotes);
    }

    @Test
    public void testGetTutorNotes_Tutor() throws Exception {
        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        List<Course> expectedCourses = new ArrayList<Course>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorNotes.add(new TutorNotes(1L, c, t, "TA"));
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockTutorNotesRepository.findAllByTutor(t)).thenReturn(expectedTutorNotes);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);
        when(mockTutorRepository.findByEmail("email")).thenReturn(Optional.of(t));

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);

        MvcResult response = mockMvc.perform(get("/api/member/tutorNotes").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).findAllByTutor(t);
        verify(mockCourseRepository, times(1)).findAllByInstructorEmail(anyString());
        verify(mockTutorRepository, times(1)).findByEmail("email");

        String responseString = response.getResponse().getContentAsString();
        List<TutorNotes> actualTutorNotes = objectMapper.readValue(responseString,
                new TypeReference<List<TutorNotes>>() {
                });
        assertEquals(actualTutorNotes, expectedTutorNotes);
    }

    @Test
    public void testGetTutorNotes_Member_NotAdmin_NotInstructor_NotTutor() throws Exception {
        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        List<Course> emptyCourseList = new ArrayList<Course>();

        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(emptyCourseList);
        when(mockTutorRepository.findByEmail("email")).thenReturn(Optional.empty());

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);

        MvcResult response = mockMvc.perform(get("/api/member/tutorNotes").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

        verify(mockCourseRepository, times(1)).findAllByInstructorEmail(anyString());
        verify(mockTutorRepository, times(1)).findByEmail("email");

        String responseString = response.getResponse().getContentAsString();
        List<TutorNotes> actualTutorNotes = objectMapper.readValue(responseString,
                new TypeReference<List<TutorNotes>>() {
                });
        assertEquals(actualTutorNotes, expectedTutorNotes);
    }

    @Test
    public void testGetTutorNotes_Unauthorized() throws Exception {
        List<Course> expectedCourses = new ArrayList<Course>();
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(false);

        mockMvc.perform(get("/api/member/tutorNotes").contentType("application/json").header(HttpHeaders.AUTHORIZATION,
                "Bearer " + userToken())).andExpect(status().isUnauthorized());
    }

    @Test
    public void testSaveTutorNotes_Unauthorized_Member() throws Exception {
        List<Course> expectedCourses = new ArrayList<Course>();
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203',"
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, NotesType: 'TA'}";
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);

        mockMvc.perform(post("/api/member/tutorNotes").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").content(requestBody)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isUnauthorized());
    }

    @Test
    public void testSaveTutorNotes_Unauthorized_NonMember() throws Exception {
        List<Course> expectedCourses = new ArrayList<Course>();
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203',"
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, NotesType: 'TA'}";
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);

        mockMvc.perform(post("/api/member/tutorNotes").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").content(requestBody)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isUnauthorized());
    }

    @Test
    public void testSaveTutorNotes_Authorized_Instructor() throws Exception {
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");

        List<Course> expectedCourses = new ArrayList<Course>();
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC156', id: '1', quarter: '20203',"
                + "instructorFirstName: 'Phil', instructorLastName: 'Conrad', instructorEmail: 'phtcon@ucsb.edu'}, NotesType: 'TA'}";

        Course c = new Course(1L, "CMPSC156", "20203", "Phil", "Conrad", "phtcon@ucsb.edu");
        TutorNotes expectedTutorNotes = new TutorNotes(null, c, t, "TA");

        expectedCourses.add(c);
        AppUser user = new AppUser(1L, "phtcon@ucsb.edu", "Phil", "Conrad");

        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);

        when(mockCourseRepository.findAllByInstructorEmail("phtcon@ucsb.edu")).thenReturn(expectedCourses);
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorNotesRepository.save(any())).thenReturn(expectedTutorNotes);

        mockMvc.perform(post("/api/member/tutorNotes").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").content(requestBody)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();
    }

    @Test
    public void testSaveTutorNotes_BadRequest() throws Exception {
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203', "
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, NotesType: 'TA'}";
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);

        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/member/tutorNotes").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").content(requestBody)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isBadRequest());
    }

    @Test
    public void testSaveTutorNotes_Admin() throws Exception {
        Course c = new Course(2L, "CMPSC 148", "20203", "Chandra", "Krintz", "krintz@example.org");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        TutorNotes expectedTutorNotes = new TutorNotes(null, c, t, "TA");
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203',"
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, NotesType: 'TA'}";
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);

        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorNotesRepository.save(any())).thenReturn(expectedTutorNotes);

        MvcResult response = mockMvc
                .perform(post("/api/member/tutorNotes").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8").content(requestBody)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).save(expectedTutorNotes);

        String responseString = response.getResponse().getContentAsString();
        TutorNotes actualTutorNotes = objectMapper.readValue(responseString, TutorNotes.class);
        assertEquals(actualTutorNotes, expectedTutorNotes);
    }

    @Test
    public void testSaveTutorNotes_Instructor() throws Exception {
        List<Course> expectedCourses = new ArrayList<Course>();
        Course c = new Course(2L, "CMPSC 148", "20203", "Chandra", "Krintz", "krintz@example.org");
        expectedCourses.add(c);
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        TutorNotes expectedTutorNotes = new TutorNotes(null, c, t, "TA");
        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'CMPSC 148', id: '2', quarter: '20203',"
                + "instructorFirstName: 'Chandra', instructorLastName: 'Krintz', instructorEmail: 'krintz@example.org'}, NotesType: 'TA'}";
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);

        when(mockCourseRepository.findAllByInstructorEmail("email")).thenReturn(expectedCourses);
        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorNotesRepository.save(any())).thenReturn(expectedTutorNotes);

        MvcResult response = mockMvc
                .perform(post("/api/member/tutorNotes").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8").content(requestBody)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).save(expectedTutorNotes);

        String responseString = response.getResponse().getContentAsString();
        TutorNotes actualTutorNotes = objectMapper.readValue(responseString, TutorNotes.class);
        assertEquals(actualTutorNotes, expectedTutorNotes);
    }

    @Test
    public void testGetASingleTutorNotes() throws Exception {
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "fname", "lname", "email@ucsb.edu");
        TutorNotes expectedTutorNotes = new TutorNotes(1L, c, t, "TA");

        // mockito is the library that allows us to do this when stuff
        when(mockTutorNotesRepository.findById(1L)).thenReturn(Optional.of(expectedTutorNotes));
        MvcResult response = mockMvc
                .perform(get("/api/member/tutorNotes/1").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).findById(1L);

        String responseString = response.getResponse().getContentAsString();
        TutorNotes actualTutorNotes = objectMapper.readValue(responseString, TutorNotes.class);
        assertEquals(actualTutorNotes, expectedTutorNotes);
    }

    @Test
    public void testGetANonExistingTutorNote() throws Exception {
        when(mockTutorNotesRepository.findById(99999L)).thenReturn(Optional.ofNullable(null));
        mockMvc.perform(get("/api/member/tutorNotes/99999").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateTutorNotes_tutorNotesExists_updateValues() throws Exception {

        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        Course c2 = new Course(2L, "course 2", "20203", "fname", "lname", "email");
        Tutor t2 = new Tutor(2L, "fname2", "lname2", "email2@ucsb.edu");

        TutorNotes inputTutorNotes = new TutorNotes(1L, c1, t, "TA");
        TutorNotes savedTutorNotes = new TutorNotes(1L, c2, t2, "LA");

        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'course 1', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'instr@ucsb.edu'}, NotesType: 'TA'}";

        String body = objectMapper.writeValueAsString(inputTutorNotes);
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);

        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorNotesRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutorNotes));
        when(mockTutorNotesRepository.save(inputTutorNotes)).thenReturn(inputTutorNotes);

        MvcResult response = mockMvc.perform(put("/api/member/tutorNotes/1").with(csrf())
                .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(requestBody))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).findById(inputTutorNotes.getId());
        verify(mockTutorNotesRepository, times(1)).save(inputTutorNotes);

        String responseString = response.getResponse().getContentAsString();

        assertEquals(body, responseString);
    }

    @Test
    public void testUpdateTutorNotes_tutorNotesExists_updateValuesForSameTutor() throws Exception {

        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        Course c2 = new Course(2L, "course 2", "20203", "fname", "lname", "email");

        TutorNotes inputTutorNotes = new TutorNotes(1L, c1, t, "TA");
        TutorNotes savedTutorNotes = new TutorNotes(1L, c2, t, "LA");

        String requestBody = "{tutor:  {email: 'scottpchow@ucsb.edu', firstName: 'Scott', id: '1', lastName: 'Chow'}, "
                + "tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'course 1', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'instr@ucsb.edu'}, NotesType: 'TA'}";

        String body = objectMapper.writeValueAsString(inputTutorNotes);
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);

        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorNotesRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutorNotes));
        when(mockTutorNotesRepository.save(inputTutorNotes)).thenReturn(inputTutorNotes);

        MvcResult response = mockMvc.perform(put("/api/member/tutorNotes/1").with(csrf())
                .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(requestBody))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).findById(inputTutorNotes.getId());
        verify(mockTutorNotesRepository, times(1)).save(inputTutorNotes);

        String responseString = response.getResponse().getContentAsString();

        assertEquals(body, responseString);
    }

    @Test
    public void testUpdateTutorNotes_unauthorizedIfNotAdmin() throws Exception {
        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");

        TutorNotes inputTutorNotes = new TutorNotes(1L, c1, t, "TA");

        String body = objectMapper.writeValueAsString(inputTutorNotes);

        mockMvc.perform(put("/api/member/tutorNotes/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testUpdateTutorNotes_unauthorized() throws Exception {
        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        Course c2 = new Course(2L, "course 2", "20203", "fname", "lname", "email");

        TutorNotes inputTutorNotes = new TutorNotes(1L, c1, t, "TA");
        TutorNotes savedTutorNotes = new TutorNotes(1L, c2, t, "LA");

        String requestBody = "{tutor:  {email: 'scottpchow@ucsb.edu', firstName: 'Scott', id: '1', lastName: 'Chow'}, "
                + "tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'course 1', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'instr@ucsb.edu'}, NotesType: 'TA'}";

        String body = objectMapper.writeValueAsString(inputTutorNotes);
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);

        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorNotesRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutorNotes));
        when(mockTutorNotesRepository.save(inputTutorNotes)).thenReturn(inputTutorNotes);

        mockMvc.perform(put("/api/member/tutorNotes/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
                .content(requestBody)).andExpect(status().isUnauthorized());

    }

    @Test
    public void testUpdateTutorNotes_tutorNotesNotFound() throws Exception {
        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");

        TutorNotes inputTutorNotes = new TutorNotes(1L, c1, t, "TA");

        String body = objectMapper.writeValueAsString(inputTutorNotes);
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);

        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorNotesRepository.findById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/member/tutorNotes/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
                .andExpect(status().isNotFound()).andReturn();
        verify(mockTutorNotesRepository, times(1)).findById(1L);
        verify(mockTutorNotesRepository, times(0)).save(any(TutorNotes.class));
    }

    @Test
    public void testUpdateTutorNotes_TutorIsNotPresent() throws Exception {

        Course c1 = new Course(1L, "course 1", "20203", "fname", "lname", "instr@ucsb.edu");
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        Course c2 = new Course(2L, "course 2", "20203", "fname", "lname", "email");
        Tutor t2 = new Tutor(2L, "fname2", "lname2", "scottpchow@ucsb.edu");
        Tutor t3 = new Tutor();

        TutorNotes inputTutorNotes = new TutorNotes(1L, c1, t, "TA");
        TutorNotes savedTutorNotes = new TutorNotes(2L, c2, t, "LA");

        String requestBody = "{tutorEmail: 'scottpchow@ucsb.edu', course:  {name: 'course 1', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'instr@ucsb.edu'}, NotesType: 'TA'}";

        String requestBody2 = "{tutorEmail: 'email2@ucsb.edu', course:  {name: 'course 2', id: '1', quarter: '20203',"
                + "instructorFirstName: 'fname', instructorLastName: 'lname', instructorEmail: 'email'}, NotesType: 'LA'}";

        String body = objectMapper.writeValueAsString(inputTutorNotes);
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);

        when(mockTutorRepository.findByEmail("scottpchow@ucsb.edu")).thenReturn(Optional.of(t3));

        when(mockTutorNotesRepository.findById(any(Long.class))).thenReturn(Optional.of(savedTutorNotes));
        mockMvc.perform(put("/api/member/tutorNotes/2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())
                .content(requestBody2)).andExpect(status().isBadRequest());
    }

    @Test
    public void testGetTutorNotesByCourseID() throws Exception {
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);

        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorNotes.add(new TutorNotes(1L, c, t, "TA"));
        // mockito is the library that allows us to do this when stuf
        when(mockTutorNotesRepository.findAllByCourseId(1L)).thenReturn((expectedTutorNotes));
        MvcResult response = mockMvc
                .perform(get("/api/member/tutorNotes/byCourseId/1").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).findAllByCourseId(1L);

        String responseString = response.getResponse().getContentAsString();
        List<TutorNotes> actualNotes = objectMapper.readValue(responseString, new TypeReference<List<TutorNotes>>() {
        });
        assertEquals(actualNotes, expectedTutorNotes);

    }

    @Test
    public void testGetTutorNotesByCourseIDUnauthorized() throws Exception {
        AppUser user = new AppUser(1L, "email", "Seth", "VanB");

        when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
        when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(false);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);

        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorNotes.add(new TutorNotes(1L, c, t, "TA"));
        // mockito is the library that allows us to do this when stuf
        when(mockTutorNotesRepository.findAllByCourseId(1L)).thenReturn((expectedTutorNotes));
        mockMvc.perform(get("/api/member/tutorNotes/byCourseId/1").contentType("application/json")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isUnauthorized());

    }

    @Test
    public void testGetTutorNotesByTutor() throws Exception {
        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Tutor t = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        expectedTutorNotes.add(new TutorNotes(1L, c, t, "TA"));

        // mockito is the library that allows us to do this when stuf
        when(mockTutorRepository.findByEmail("vanbrocklin@ucsb.edu")).thenReturn(Optional.of(t));
        when(mockTutorNotesRepository.findAllByTutor(t)).thenReturn(expectedTutorNotes);

        MvcResult response = mockMvc
                .perform(get("/api/member/tutorNotes/byTutor/vanbrocklin@ucsb.edu").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorRepository, times(1)).findByEmail("vanbrocklin@ucsb.edu");
        verify(mockTutorNotesRepository, times(1)).findAllByTutor(t);

        String responseString = response.getResponse().getContentAsString();
        List<TutorNotes> actualNotes = objectMapper.readValue(responseString, new TypeReference<List<TutorNotes>>() {
        });
        assertEquals(actualNotes, expectedTutorNotes);

    }

    @Test
    public void testGetCourse() throws Exception {
        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        List<TutorNotes> resultingTutorNotes = new ArrayList<TutorNotes>();
        Course c1 = new Course(1L, "course 1", "F20", "fname", "lname", "email");
        Course c2 = new Course(2L, "course 2", "S20", "fname", "lname", "email");
        Tutor t1 = new Tutor(1L, "Seth", "VanB", "vanbrocklin@ucsb.edu");
        Tutor t2 = new Tutor(2L, "Au", "Go", "AuGo@ucsb.edu");
        resultingTutorNotes.add(new TutorNotes(1L, c1, t1, "TA"));
        resultingTutorNotes.add(new TutorNotes(2L, c2, t2, "TA"));

        expectedTutorNotes.add(new TutorNotes(1L, c1, t1, "TA"));

        when(mockTutorNotesRepository.findAll()).thenReturn((resultingTutorNotes));
        MvcResult response = mockMvc
                .perform(get("/api/member/tutorNotes/byCourseNumber/course 1").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();
        verify(mockTutorNotesRepository, times(1)).findAll();

        String responseString = response.getResponse().getContentAsString();
        List<TutorNotes> actualTutorNotes = objectMapper.readValue(responseString,
                new TypeReference<List<TutorNotes>>() {
                });
        assertEquals(actualTutorNotes, expectedTutorNotes);
    }

    @Test
    public void testGetCourseNumbers() throws Exception {
        List<Course> expectedCourses = new ArrayList<Course>();
        Course c = new Course(2L, "CMPSC 148", "20203", "Chandra", "Krintz", "krintz@example.org");
        expectedCourses.add(c);
        Tutor t = new Tutor(1L, "Scott", "Chow", "scottpchow@ucsb.edu");
        TutorNotes notes = new TutorNotes(null, c, t, "TA");
        List<TutorNotes> expectedTutorNotes = new ArrayList<TutorNotes>();
        expectedTutorNotes.add(notes);
        Set<String> expectedCourseNumbers = new HashSet<String>();
        expectedCourseNumbers.add(notes.getCourse().getName());

        when(mockTutorNotesRepository.findAll()).thenReturn((expectedTutorNotes));
        MvcResult response = mockMvc
                .perform(get("/api/member/tutorNotes/course_numbers").contentType("application/json")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                .andExpect(status().isOk()).andReturn();

        verify(mockTutorNotesRepository, times(1)).findAll();

        String responseString = response.getResponse().getContentAsString();
        Set<String> actualCourseNumber = objectMapper.readValue(responseString, new TypeReference<Set<String>>() {
        });
        assertEquals(actualCourseNumber, expectedCourseNumbers);
    }
}
