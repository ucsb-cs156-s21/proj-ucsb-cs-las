package edu.ucsb.ucsbcslas.controllers;

import edu.ucsb.ucsbcslas.entities.AppUser;
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;

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
import static org.mockito.ArgumentMatchers.eq;
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
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import jdk.jfr.Timestamp;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.OnlineOfficeHoursRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;

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

        @MockBean
        OnlineOfficeHoursRepository mockOnlineOfficeHoursRepository;

        @MockBean
        TutorAssignmentRepository mockTutorAssignmentRepository;

        private String userToken() {
                return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
        }

        @Test
        public void testDeleteTutorNotes_tutorNotesExists() throws Exception {
                Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
                Course c = new Course(1L, "CS156", "20212", "Phil", "Conrad", "pconrad@ucsb.edu");
                TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "TA");
                OnlineOfficeHours onlineOfficeHours = new OnlineOfficeHours(1L, tutorAssignment, "Wednesday", "8:00",
                                "10:00", "link", "notes");

                TutorNotes expectedTutorNotes = new TutorNotes();
                expectedTutorNotes.setId(1L);
                expectedTutorNotes.setOnlineOfficeHours(onlineOfficeHours);
                expectedTutorNotes.setMessage("Notes example");

                when(mockTutorNotesRepository.findById(1L)).thenReturn(Optional.of(expectedTutorNotes));
                when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
                MvcResult response = mockMvc
                                .perform(delete("/api/admin/tutorNotes/1").with(csrf())
                                                .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                                .andExpect(status().isNoContent()).andReturn();
                verify(mockTutorNotesRepository, times(1)).findById(expectedTutorNotes.getId());
                verify(mockTutorNotesRepository, times(1)).deleteById(expectedTutorNotes.getId());

                String responseString = response.getResponse().getContentAsString();

                assertEquals(responseString.length(), 0);
        }

        @Test
        public void testDeleteTutorNotes_unauthorizedIfNotAdmin() throws Exception {
                mockMvc.perform(delete("/api/admin/tutorNotes/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                                .andExpect(status().isUnauthorized());
        }

        @Test
        public void testDeleteTutorNotes_tutorNotesNotFound() throws Exception {
                long id = 1L;
                when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
                when(mockTutorNotesRepository.findById(id)).thenReturn(Optional.empty());
                mockMvc.perform(delete("/api/admin/tutorNotes/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                                .andExpect(status().isNotFound()).andReturn();
                verify(mockTutorNotesRepository, times(1)).findById(id);
                verify(mockTutorNotesRepository, times(0)).deleteById(id);

        }

        @Test
        public void testGetTutorNotes_Admin() throws Exception {

                AppUser user = new AppUser(1L, "email", "Seth", "VanB");
                Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
                Course c = new Course(1L, "CS156", "20212", "Phil", "Conrad", "pconrad@ucsb.edu");
                TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "TA");
                OnlineOfficeHours onlineOfficeHours = new OnlineOfficeHours(1L, tutorAssignment, "Wednesday", "8:00",
                                "10:00", "link", "notes");

                TutorNotes expectedTutorNotes = new TutorNotes();
                expectedTutorNotes.setId(1L);
                expectedTutorNotes.setOnlineOfficeHours(onlineOfficeHours);
                expectedTutorNotes.setMessage("Notes example");

                List<TutorNotes> expectedTutorNotesList = new ArrayList<>();
                expectedTutorNotesList.add(expectedTutorNotes);

                when(mockTutorNotesRepository.findAll()).thenReturn(expectedTutorNotesList);
                when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
                when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
                when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);

                MvcResult response = mockMvc
                                .perform(get("/api/member/tutorNotes/").contentType("application/json")
                                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                                .andExpect(status().isOk()).andReturn();

                verify(mockTutorNotesRepository, times(1)).findAll();

                String responseString = response.getResponse().getContentAsString();
                List<TutorNotes> actualTutorNotesList = objectMapper.readValue(responseString,
                                new TypeReference<List<TutorNotes>>() {
                                });

                assertEquals(expectedTutorNotesList, actualTutorNotesList);

        }

        @Test
        public void testGetTutorNotes_Instructor() throws Exception {

                AppUser user = new AppUser(1L, "pconrad@ucsb.edu", "Phil", "Conrad");
                Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
                Course c = new Course(1L, "CS156", "20212", "Phil", "Conrad", "pconrad@ucsb.edu");
                TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "TA");
                OnlineOfficeHours onlineOfficeHours = new OnlineOfficeHours(1L, tutorAssignment, "Wednesday", "8:00",
                                "10:00", "link", "notes");

                TutorNotes expectedTutorNotes = new TutorNotes();
                expectedTutorNotes.setId(1L);
                expectedTutorNotes.setOnlineOfficeHours(onlineOfficeHours);
                expectedTutorNotes.setMessage("Notes example");

                List<TutorNotes> expectedTutorNotesList = new ArrayList<>();
                expectedTutorNotesList.add(expectedTutorNotes);

                when(mockTutorNotesRepository
                                .findAllByOnlineOfficeHoursTutorAssignmentCourseInstructorEmail("pconrad@ucsb.edu"))
                                                .thenReturn(expectedTutorNotesList);
                when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
                when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
                when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);

                MvcResult response = mockMvc
                                .perform(get("/api/member/tutorNotes/").contentType("application/json")
                                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                                .andExpect(status().isOk()).andReturn();

                verify(mockTutorNotesRepository, times(1))
                                .findAllByOnlineOfficeHoursTutorAssignmentCourseInstructorEmail("pconrad@ucsb.edu");

                String responseString = response.getResponse().getContentAsString();
                List<TutorNotes> actualTutorNotesList = objectMapper.readValue(responseString,
                                new TypeReference<List<TutorNotes>>() {
                                });

                assertEquals(expectedTutorNotesList, actualTutorNotesList);

        }

        @Test
        public void testGetTutorNotes_unauthorizedIfNotMember() throws Exception {
                mockMvc.perform(get("/api/member/tutorNotes/").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                                .andExpect(status().isUnauthorized());
        }

        @Test
        public void testCreateTutorNotes_unauthorizedIfNotMember() throws Exception {
                AppUser user = new AppUser(1L, "pconrad@ucsb.edu", "Phil", "Conrad");
                Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
                Course c = new Course(1L, "CS156", "20212", "Phil", "Conrad", "pconrad@ucsb.edu");
                TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "TA");
                OnlineOfficeHours onlineOfficeHours = new OnlineOfficeHours(1L, tutorAssignment, "Wednesday", "8:00",
                                "10:00", "link", "notes");

                TutorNotes expectedTutorNotes = new TutorNotes();
                expectedTutorNotes.setId(1L);
                expectedTutorNotes.setOnlineOfficeHours(onlineOfficeHours);
                expectedTutorNotes.setMessage("Notes example");

                String requestBody = objectMapper.writeValueAsString(expectedTutorNotes);

                mockMvc.perform(post("/api/member/tutorNotes/").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding("utf-8").content(requestBody)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                                .andExpect(status().isUnauthorized());
        }

        @Test
        public void testCreateTutorNotes_authorized() throws Exception {
                AppUser user = new AppUser(1L, "cgaucho@ucsb.edu", "Chris", "Gaucho");
                Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
                Course c = new Course(1L, "CS156", "20212", "Phil", "Conrad", "pconrad@ucsb.edu");
                TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "TA");
                OnlineOfficeHours onlineOfficeHours = new OnlineOfficeHours(1L, tutorAssignment, "Wednesday", "8:00",
                                "10:00", "link", "notes");

                TutorNotes expectedTutorNotes = new TutorNotes();

                expectedTutorNotes.setOnlineOfficeHours(onlineOfficeHours);
                expectedTutorNotes.setMessage("Notes example");

                String requestBody = objectMapper.writeValueAsString(expectedTutorNotes);
                List<OnlineOfficeHours> onlineOfficeHoursList = new ArrayList<>();
                onlineOfficeHoursList.add(onlineOfficeHours);

                when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
                when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
                when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
                when(mockTutorNotesRepository.save(eq(expectedTutorNotes))).thenReturn(expectedTutorNotes);
                // when(mockOnlineOfficeHoursRepository.findByTutorAssignmentTutorEmail(eq("cgaucho@ucsb.edu"))).thenReturn(onlineOfficeHoursList);
                when(mockOnlineOfficeHoursRepository.findById(1L)).thenReturn(Optional.of(onlineOfficeHours));

                MvcResult response = mockMvc.perform(post("/api/member/tutorNotes/").with(csrf())
                                .contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk())
                                .andReturn();

                verify(mockTutorNotesRepository, times(1)).save(expectedTutorNotes);

                String responseString = response.getResponse().getContentAsString();
                TutorNotes actualTutorNotes = objectMapper.readValue(responseString, TutorNotes.class);
                assertEquals(expectedTutorNotes, actualTutorNotes);

        }

        @Test
        public void testCreateTutorNotes_unAuthorized() throws Exception {
                AppUser user = new AppUser(1L, "mbonham@ucsb.edu", "Max", "Bonham");
                Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
                Course c = new Course(1L, "CS156", "20212", "Phil", "Conrad", "pconrad@ucsb.edu");
                TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "TA");
                OnlineOfficeHours onlineOfficeHours = new OnlineOfficeHours(1L, tutorAssignment, "Wednesday", "8:00",
                                "10:00", "link", "notes");

                TutorNotes expectedTutorNotes = new TutorNotes();

                expectedTutorNotes.setOnlineOfficeHours(onlineOfficeHours);
                expectedTutorNotes.setMessage("Notes example");

                String requestBody = objectMapper.writeValueAsString(expectedTutorNotes);
                List<OnlineOfficeHours> onlineOfficeHoursList = new ArrayList<>();
                onlineOfficeHoursList.add(onlineOfficeHours);

                when(mockAuthControllerAdvice.getIsMember(anyString())).thenReturn(true);
                when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(false);
                when(mockAuthControllerAdvice.getUser(anyString())).thenReturn(user);
                when(mockTutorNotesRepository.save(eq(expectedTutorNotes))).thenReturn(expectedTutorNotes);
                // when(mockOnlineOfficeHoursRepository.findByTutorAssignmentTutorEmail(eq("cgaucho@ucsb.edu"))).thenReturn(onlineOfficeHoursList);
                when(mockOnlineOfficeHoursRepository.findById(1L)).thenReturn(Optional.of(onlineOfficeHours));

                mockMvc.perform(post("/api/member/tutorNotes/").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding("utf-8").content(requestBody)
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
                                .andExpect(status().isUnauthorized());

                verify(mockTutorNotesRepository, times(0)).save(expectedTutorNotes);

        }
}
