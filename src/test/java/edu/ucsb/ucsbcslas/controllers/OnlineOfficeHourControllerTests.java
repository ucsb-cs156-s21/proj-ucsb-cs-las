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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.repositories.CourseRepository;
import edu.ucsb.ucsbcslas.repositories.OnlineOfficeHoursRepository;
import edu.ucsb.ucsbcslas.repositories.TutorRepository;
import edu.ucsb.ucsbcslas.repositories.TutorAssignmentRepository;
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.entities.RoomSlot;
import edu.ucsb.ucsbcslas.entities.ActiveQuarter;
import edu.ucsb.ucsbcslas.models.Course;

@WebMvcTest(value = OnlineOfficeHoursController.class)
@WithMockUser
public class OnlineOfficeHourControllerTests {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    OnlineOfficeHoursRepository mockOnlineOfficeHoursRepository;
  
    @MockBean
    AuthControllerAdvice mockAuthControllerAdvice;
  
    @MockBean
    TutorAssignmentRepository mockTutorAssignmentRepository;

    @MockBean
    CourseRepository mockCourseRepository;

    @MockBean
    TutorRepository mockTutorRepository;


    private String userToken() {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
    }

    @Test
    public void testGetOfficeHours() throws Exception {
        List<OnlineOfficeHours> expectedOfficeHours = new ArrayList<OnlineOfficeHours>();

        Tutor tutor = new Tutor(1L,
                "String firstName",
                "String lastName",
                "String email");
        Course course = new Course(1L,
                "String name",
                "String quarter",
                "String instructorFirstName",
                "String instructorLastName",
                "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L,
                course,
                tutor,
                "String assignmentType");
        RoomSlot rs = new RoomSlot(1L,
                "String location",
                "String quarter",
                DayOfWeek.WEDNESDAY,
                LocalTime.of(20, 0),
                LocalTime.of(22,0));
        expectedOfficeHours.add(new OnlineOfficeHours(1L, tutorAssignment, rs, "link", "notes"));

        when(mockOnlineOfficeHoursRepository.findAll()).thenReturn(expectedOfficeHours);
        MvcResult response = mockMvc.perform(get("/api/public/officeHours").contentType("application/json")
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

        verify(mockOnlineOfficeHoursRepository, times(1)).findAll();

        String responseString = response.getResponse().getContentAsString();
        List<OnlineOfficeHours> actualOfficeHours = objectMapper.readValue(responseString, new TypeReference<List<OnlineOfficeHours>>() {
        });
        assertEquals(actualOfficeHours, expectedOfficeHours);
    }

    @Test
    public void testGetASingleOfficeHour() throws Exception {
        Tutor tutor = new Tutor(1L,
                "String firstName",
                "String lastName",
                "String email");
        Course course = new Course(1L,
                "String name",
                "String quarter",
                "String instructorFirstName",
                "String instructorLastName",
                "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L,
                course,
                tutor,
                "String assignmentType");
        RoomSlot roomSlot = new RoomSlot(1L,
                "String location",
                "String Quarter",
                DayOfWeek.WEDNESDAY,
                LocalTime.of(20, 0),
                LocalTime.of(22,0));
        OnlineOfficeHours expectedOfficeHour = new OnlineOfficeHours(1L,
                tutorAssignment,
                roomSlot,
                "link",
                "notes");

        when(mockOnlineOfficeHoursRepository.findById(1L)).thenReturn(Optional.of(expectedOfficeHour));
        MvcResult response = mockMvc.perform(get("/api/public/officeHours/1").contentType("application/json").header(HttpHeaders.AUTHORIZATION, 
        "Bearer " + userToken())).andExpect(status().isOk()).andReturn();

        verify(mockOnlineOfficeHoursRepository, times(1)).findById(1L);
    
        String responseString = response.getResponse().getContentAsString();
        OnlineOfficeHours actualOfficeHour = objectMapper.readValue(responseString, OnlineOfficeHours.class);
        assertEquals(actualOfficeHour, expectedOfficeHour);
    }

    @Test
    public void testGetANonExistingOfficeHour() throws Exception {
        when(mockOnlineOfficeHoursRepository.findById(99999L)).thenReturn(Optional.ofNullable(null));
        mockMvc.perform(get("/api/public/officeHours/99999").contentType("application/json").header(HttpHeaders.AUTHORIZATION, 
        "Bearer " + userToken())).andExpect(status().isNotFound());
    }

    @Test
    public void testSaveOfficeHour() throws Exception {
        Tutor tutor = new Tutor(1L,
                "String firstName",
                "String lastName",
                "String email");
        Course course = new Course(1L,
                "String name",
                "String quarter",
                "String instructorFirstName",
                "String instructorLastName",
                "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L,
                course,
                tutor,
                "String assignmentType");
        RoomSlot roomSlot = new RoomSlot(1L,
                "String location",
                "String quarter",
                DayOfWeek.WEDNESDAY,
                LocalTime.of(20, 0),
                LocalTime.of(22,0));
        OnlineOfficeHours expectedOfficeHour = new OnlineOfficeHours(1L,
                tutorAssignment,
                roomSlot,
                "link",
                "notes");

        String requestBody = objectMapper.writeValueAsString(expectedOfficeHour);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockOnlineOfficeHoursRepository.save(any())).thenReturn(expectedOfficeHour);
        MvcResult response = mockMvc
        .perform(post("/api/admin/officeHours").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isOk()).andReturn();

        verify(mockOnlineOfficeHoursRepository, times(1)).save(expectedOfficeHour);

        String responseString = response.getResponse().getContentAsString();
        OnlineOfficeHours actualOfficeHour = objectMapper.readValue(responseString, OnlineOfficeHours.class);
        assertEquals(actualOfficeHour, expectedOfficeHour);
    }

    @Test
    public void test_saveOfficeHour_unauthorizedIfNotAdmin() throws Exception {
        Tutor tutor = new Tutor(1L,
                "String firstName",
                "String lastName",
                "String email");
        Course course = new Course(1L,
                "String name",
                "String quarter",
                "String instructorFirstName",
                "String instructorLastName",
                "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L,
                course, tutor,
                "String assignmentType");
        RoomSlot roomSlot = new RoomSlot(1L,
                "String location",
                "String quarter",
                DayOfWeek.WEDNESDAY,
                LocalTime.of(20, 0),
                LocalTime.of(22,0));

        OnlineOfficeHours expectedOfficeHour = new OnlineOfficeHours(1L, tutorAssignment, roomSlot, "link", "notes");
        String requestBody = objectMapper.writeValueAsString(expectedOfficeHour);
        mockMvc.perform(post("/api/admin/officeHours").with(csrf()).contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8").content(requestBody).header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
        .andExpect(status().isUnauthorized());
    }

    @Test
    public void testUpdateOfficeHour_OfficeHourExists_updateValues() throws Exception {
        Tutor t = new Tutor(1L, "String firstName", "String lastName", "String email");
        Course c = new Course(1L, "String name", "String quarter", "String instructorFirstName", "String instructorLastName", "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "String assignmentType");
        RoomSlot testRoomSlot = new RoomSlot("Library", "20212", DayOfWeek.WEDNESDAY, LocalTime.of(8, 0, 0), LocalTime.of(11, 0, 0));
        OnlineOfficeHours savedOfficeHour = new OnlineOfficeHours(1L, tutorAssignment, testRoomSlot, "link", "notes");
        OnlineOfficeHours inputOfficeHour = new OnlineOfficeHours(1L, tutorAssignment, testRoomSlot, "link", "notes");
        String body = objectMapper.writeValueAsString(inputOfficeHour);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockOnlineOfficeHoursRepository.findById(any(Long.class))).thenReturn(Optional.of(savedOfficeHour));
        when(mockOnlineOfficeHoursRepository.save(inputOfficeHour)).thenReturn(inputOfficeHour);
        MvcResult response = mockMvc
            .perform(put("/api/admin/officeHours/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
            .andExpect(status().isOk()).andReturn();
        verify(mockOnlineOfficeHoursRepository, times(1)).findById(inputOfficeHour.getId());
        verify(mockOnlineOfficeHoursRepository, times(1)).save(inputOfficeHour);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(body, responseString);
    }
    @Test
    public void testUpdateOfficeHour_unauthorizedIfNotAdmin() throws Exception {
        Tutor t = new Tutor(1L, "String firstName", "String lastName", "String email");
        Course c = new Course(1L, "String name", "String quarter", "String instructorFirstName", "String instructorLastName", "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "String assignmentType");
        RoomSlot testRoomSlot = new RoomSlot("Library", "20212", DayOfWeek.WEDNESDAY, LocalTime.of(8, 0, 0), LocalTime.of(11, 0, 0));
        OnlineOfficeHours inputOfficeHour = new OnlineOfficeHours(1L, tutorAssignment, testRoomSlot, "link", "notes");
        String body = objectMapper.writeValueAsString(inputOfficeHour);
        mockMvc
        .perform(put("/api/admin/officeHours/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
            .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
        .andExpect(status().isUnauthorized());
    }
    @Test
    public void testUpdateOfficeHour_OfficeHourNotFound() throws Exception {
        Tutor t = new Tutor(1L, "String firstName", "String lastName", "String email");
        Course c = new Course(1L, "String name", "String quarter", "String instructorFirstName", "String instructorLastName", "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "String assignmentType");
        RoomSlot testRoomSlot = new RoomSlot("Library", "20212", DayOfWeek.WEDNESDAY, LocalTime.of(8, 0, 0), LocalTime.of(11, 0, 0));
        OnlineOfficeHours inputOfficeHour = new OnlineOfficeHours(1L, tutorAssignment, testRoomSlot, "link", "notes");
        String body = objectMapper.writeValueAsString(inputOfficeHour);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockOnlineOfficeHoursRepository.findById(1L)).thenReturn(Optional.empty());
        mockMvc
            .perform(put("/api/admin/officeHours/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
            .andExpect(status().isNotFound()).andReturn();
        verify(mockOnlineOfficeHoursRepository, times(1)).findById(1L);
        verify(mockOnlineOfficeHoursRepository, times(0)).save(any(OnlineOfficeHours.class));
    }
    @Test
    public void testUpdateCourse_OfficeHourAtPathOwned_butTryingToOverwriteAnotherOfficeHour() throws Exception {
        Tutor t = new Tutor(1L, "String firstName", "String lastName", "String email");
        Course c = new Course(1L, "String name", "String quarter", "String instructorFirstName", "String instructorLastName", "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L, c, t, "String assignmentType");
        RoomSlot testRoomSlot = new RoomSlot("Library", "20212", DayOfWeek.WEDNESDAY, LocalTime.of(8, 0, 0), LocalTime.of(11, 0, 0));
        OnlineOfficeHours inputOfficeHour = new OnlineOfficeHours(1L, tutorAssignment, testRoomSlot, "link", "notes");
        OnlineOfficeHours savedOfficeHour = new OnlineOfficeHours(2L, tutorAssignment, testRoomSlot, "link", "notes");
        String body = objectMapper.writeValueAsString(inputOfficeHour);
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockOnlineOfficeHoursRepository.findById(any(Long.class))).thenReturn(Optional.of(savedOfficeHour));
        mockMvc
            .perform(put("/api/admin/officeHours/2").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()).content(body))
            .andExpect(status().isBadRequest()).andReturn();
        verify(mockOnlineOfficeHoursRepository, times(1)).findById(2L);
        verify(mockOnlineOfficeHoursRepository, times(0)).save(any(OnlineOfficeHours.class));
    }

    @Test
    public void testDeleteOfficeHour_officeHourExists() throws Exception {
        Tutor tutor = new Tutor(1L,
                "String firstName",
                "String lastName",
                "String email");
        Course course = new Course(1L,
                "String name",
                "String quarter",
                "String instructorFirstName",
                "String instructorLastName",
                "String instructorEmail");
        TutorAssignment tutorAssignment = new TutorAssignment(1L,
                course,
                tutor,
                "String assignmentType");
        RoomSlot roomSlot = new RoomSlot(1L,
                "String location",
                "String quarter",
                DayOfWeek.WEDNESDAY,
                LocalTime.of(20, 0),
                LocalTime.of(22,0));
        OnlineOfficeHours expectedOfficeHour = new OnlineOfficeHours(1L,
                tutorAssignment,
                roomSlot,
                "link",
                "notes");

        when(mockOnlineOfficeHoursRepository.findById(1L)).thenReturn(Optional.of(expectedOfficeHour));
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        MvcResult response = mockMvc
            .perform(delete("/api/admin/officeHours/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isNoContent()).andReturn();
        verify(mockOnlineOfficeHoursRepository, times(1)).findById(expectedOfficeHour.getId());
        verify(mockOnlineOfficeHoursRepository, times(1)).deleteById(expectedOfficeHour.getId());

        String responseString = response.getResponse().getContentAsString();

        assertEquals(responseString.length(), 0);
    }

    @Test
    public void testDeleteOfficeHour_unauthorizedIfNotAdmin() throws Exception {
        mockMvc
            .perform(delete("/api/admin/officeHours/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isUnauthorized());
    }

    @Test
    public void testDeleteOfficeHour_courseNotFound() throws Exception {
        long id = 1L;
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockOnlineOfficeHoursRepository.findById(id)).thenReturn(Optional.empty());
        mockMvc
            .perform(delete("/api/admin/officeHours/1").with(csrf()).contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8").header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isNotFound()).andReturn();
        verify(mockOnlineOfficeHoursRepository, times(1)).findById(id);
        verify(mockOnlineOfficeHoursRepository, times(0)).deleteById(id);
    }

    // dummy room slot data
    Long testRoomSlotId = 1L;
    String testRoomSlotLocation = "The Library";
    String testRoomSlotQuarter = "F21";
    DayOfWeek testRoomSlotDayOfWeek = DayOfWeek.MONDAY;
    LocalTime testRoomSlotStartTime = LocalTime.of(13, 0);
    LocalTime testRoomSlotEndTime = LocalTime.of(16, 0);

    @Test
    public void testUploadFile() throws Exception{

        List<OnlineOfficeHours> expectedOfficeHours = new ArrayList<OnlineOfficeHours>();
        List<OnlineOfficeHours> emptyOHL = new ArrayList<>();
        List<TutorAssignment> TAL = new ArrayList<> ();
        Tutor t = new Tutor(1L, "String firstName", "String lastName", "email@ucsb.edu");
        Course c = new Course(1L, "String name", "F20", "String instructorFirstName", "String instructorLastName", "insEmail@ucsb.edu");
        Optional<Tutor> e = Optional.empty();
        TutorAssignment tutorAss = new TutorAssignment(1L, c, t, "String assignmentType");
        RoomSlot testRoomSlot = new RoomSlot(testRoomSlotId,
                testRoomSlotLocation,
                testRoomSlotQuarter,
                testRoomSlotDayOfWeek,
                testRoomSlotStartTime,
                testRoomSlotEndTime);
        OnlineOfficeHours oh = new OnlineOfficeHours(1L, tutorAss, testRoomSlot, "link", "notes");
        expectedOfficeHours.add(oh);
        
        String fcontent = "\"String name\",\"F20\",\"String instructorFirstName\",\"String instructorLastName\",\"insEmail@ucsb.edu\",\"String firstName\",\"String lastName\",\"String email\",\"String assignmentType\",\"Wednesday\",\"8:00\",\"10:00\",\"link\",\"notes\"";
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockCourseRepository.findByNameAndQuarter(any(String.class), any(String.class))).thenReturn(null);
        when(mockCourseRepository.save(any(Course.class))).thenReturn(c);
        when(mockTutorRepository.findByEmail(any(String.class))).thenReturn(e);
        when(mockTutorRepository.save(any(Tutor.class))).thenReturn(t);
        when(mockTutorAssignmentRepository.findAllByCourseAndTutor(any(Course.class),any(Tutor.class))).thenReturn(TAL);
        when(mockTutorAssignmentRepository.save(any(TutorAssignment.class))).thenReturn(tutorAss);
        when(mockOnlineOfficeHoursRepository.findAllByTutorAssignment(any(TutorAssignment.class))).thenReturn(emptyOHL);
        when(mockOnlineOfficeHoursRepository.save(any(OnlineOfficeHours.class))).thenReturn(oh);
        MockMultipartFile mockFile = new MockMultipartFile(
            "csv",
            "test.csv",
            MediaType.TEXT_PLAIN_VALUE,
            fcontent.getBytes("utf-8")
        );
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc
            .perform(multipart("/api/admin/officehours/upload").file(mockFile)
                .characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk())
            .andReturn();
        verify(mockOnlineOfficeHoursRepository, times(1)).save(any());
    }


    @Test
    public void testUploadFile_prexist() throws Exception{

        List<OnlineOfficeHours> expectedOfficeHours = new ArrayList<OnlineOfficeHours>();
        List<TutorAssignment> TAL = new ArrayList<> ();
        Tutor t = new Tutor(1L, "String firstName", "String lastName", "email@ucsb.edu");
        Course c = new Course(1L, "String name", "F20", "String instructorFirstName", "String instructorLastName", "insEmail@ucsb.edu");
        Optional<Tutor> OptTutor = Optional.of(t);
        TutorAssignment tutorAss = new TutorAssignment(1L, c, t, "String assignmentType");
        TAL.add(tutorAss);
        RoomSlot testRoomSlot = new RoomSlot(testRoomSlotId,
                testRoomSlotLocation,
                testRoomSlotQuarter,
                testRoomSlotDayOfWeek,
                testRoomSlotStartTime,
                testRoomSlotEndTime);
        OnlineOfficeHours oh = new OnlineOfficeHours(1L, tutorAss,testRoomSlot, "link", "notes");
        expectedOfficeHours.add(oh);
        
        String fcontent = "\"String name\",\"F20\",\"String instructorFirstName\",\"String instructorLastName\",\"insEmail@ucsb.edu\",\"String firstName\",\"String lastName\",\"String email\",\"String assignmentType\",\"Wednesday\",\"8:00\",\"10:00\",\"link\",\"notes\"";
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockCourseRepository.findByNameAndQuarter(any(String.class), any(String.class))).thenReturn(c);
        when(mockTutorRepository.findByEmail(any(String.class))).thenReturn(OptTutor);
        when(mockTutorAssignmentRepository.findAllByCourseAndTutor(any(Course.class),any(Tutor.class))).thenReturn(TAL);
        when(mockOnlineOfficeHoursRepository.findAllByTutorAssignment(any(TutorAssignment.class))).thenReturn(expectedOfficeHours);
        when(mockOnlineOfficeHoursRepository.save(any(OnlineOfficeHours.class))).thenReturn(oh);
        MockMultipartFile mockFile = new MockMultipartFile(
            "csv",
            "test.csv",
            MediaType.TEXT_PLAIN_VALUE,
            fcontent.getBytes("utf-8")
        );
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc
            .perform(multipart("/api/admin/officehours/upload").file(mockFile)
                .characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk())
            .andReturn();
        verify(mockOnlineOfficeHoursRepository, times(0)).save(any());
    }

    @Test
    public void testUploadFile_DifferentDayofWeekStartandEndtime() throws Exception{
        List<OnlineOfficeHours> expectedOfficeHours = new ArrayList<OnlineOfficeHours>();
        List<TutorAssignment> TAL = new ArrayList<> ();
        Tutor t = new Tutor(1L, "String firstName", "String lastName", "email@ucsb.edu");
        Course c = new Course(1L, "String name", "F20", "String instructorFirstName", "String instructorLastName", "insEmail@ucsb.edu");
        Optional<Tutor> OptTutor = Optional.of(t);
        TutorAssignment tutorAss = new TutorAssignment(1L, c, t, "String assignmentType");
        TAL.add(tutorAss);
        RoomSlot testRoomSlot_1 = new RoomSlot(testRoomSlotId,
                testRoomSlotLocation,
                testRoomSlotQuarter,
                DayOfWeek.MONDAY,
                testRoomSlotStartTime,
                testRoomSlotEndTime);
        RoomSlot testRoomSlot_2 = new RoomSlot(testRoomSlotId,
                testRoomSlotLocation,
                testRoomSlotQuarter,
                DayOfWeek.TUESDAY,
                testRoomSlotStartTime,
                testRoomSlotEndTime);
        RoomSlot testRoomSlot_3 = new RoomSlot(testRoomSlotId,
                testRoomSlotLocation,
                testRoomSlotQuarter,
                DayOfWeek.TUESDAY,
                testRoomSlotStartTime,
                testRoomSlotEndTime);
        RoomSlot testRoomSlot_4 = new RoomSlot(testRoomSlotId,
                testRoomSlotLocation,
                testRoomSlotQuarter,
                DayOfWeek.TUESDAY,
                testRoomSlotStartTime,
                testRoomSlotEndTime);
        OnlineOfficeHours oh = new OnlineOfficeHours(1L, tutorAss, testRoomSlot_1, "link", "notes");
        OnlineOfficeHours oh1 = new OnlineOfficeHours(2L, tutorAss,testRoomSlot_2, "link", "notes");
        OnlineOfficeHours oh2 = new OnlineOfficeHours(3L, tutorAss,testRoomSlot_3, "link", "notes");
        OnlineOfficeHours oh3 = new OnlineOfficeHours(4L, tutorAss,testRoomSlot_4, "link", "notes");
        
        expectedOfficeHours.add(oh1);
        expectedOfficeHours.add(oh2);
        expectedOfficeHours.add(oh3);
        expectedOfficeHours.add(oh);
        String fcontent = "\"String name\",\"F20\",\"String instructorFirstName\",\"String instructorLastName\",\"insEmail@ucsb.edu\",\"String firstName\",\"String lastName\",\"String email\",\"String assignmentType\",\"Wednesday\",\"8:00\",\"10:00\",\"link\",\"notes\"";
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockCourseRepository.findByNameAndQuarter(any(String.class), any(String.class))).thenReturn(c);
        when(mockTutorRepository.findByEmail(any(String.class))).thenReturn(OptTutor);
        when(mockTutorAssignmentRepository.findAllByCourseAndTutor(any(Course.class),any(Tutor.class))).thenReturn(TAL);
        when(mockOnlineOfficeHoursRepository.findAllByTutorAssignment(any(TutorAssignment.class))).thenReturn(expectedOfficeHours);
        when(mockOnlineOfficeHoursRepository.save(any(OnlineOfficeHours.class))).thenReturn(oh);
        MockMultipartFile mockFile = new MockMultipartFile(
            "csv",
            "test.csv",
            MediaType.TEXT_PLAIN_VALUE,
            fcontent.getBytes("utf-8")
        );
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc
            .perform(multipart("/api/admin/officehours/upload").file(mockFile)
                .characterEncoding("utf-8")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isOk())
            .andReturn();
        verify(mockOnlineOfficeHoursRepository, times(0)).save(any());
    }


    @Test
    public void testUploadFile_unauthorizedIfNotAdmin() throws Exception {
        when(mockCourseRepository.findByNameAndQuarter(any(String.class), any(String.class))).thenThrow(RuntimeException.class);
        MockMultipartFile mockFile = new MockMultipartFile(
            "csv",
            "test.csv",
            MediaType.TEXT_PLAIN_VALUE,
            "value,done\ntodo,false".getBytes()
        );
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        MvcResult response = mockMvc.perform(multipart("/api/admin/officehours/upload").file(mockFile)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isUnauthorized()).andReturn();

        verify(mockOnlineOfficeHoursRepository, never()).save(any());
    }

    @Test
    public void testUploadFileThrowsRuntime() throws Exception{
        when(mockAuthControllerAdvice.getIsAdmin(anyString())).thenReturn(true);
        when(mockCourseRepository.findByNameAndQuarter(any(String.class), any(String.class))).thenThrow(RuntimeException.class);
        MockMultipartFile mockFile = new MockMultipartFile(
            "csv",
            "test.csv",
            MediaType.TEXT_PLAIN_VALUE,
            "value,done\ntodo,false".getBytes()
        );
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        MvcResult response = mockMvc.perform(multipart("/api/admin/officehours/upload").file(mockFile)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken()))
            .andExpect(status().isBadRequest()).andReturn();

        verify(mockOnlineOfficeHoursRepository, never()).save(any());
    }

 }