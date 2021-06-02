package edu.ucsb.ucsbcslas.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.entities.RoomSlot;
import edu.ucsb.ucsbcslas.entities.ActiveQuarter;

public class TutorAssignmentOfficeHourViewTest {
  @Test
  public void testTutorAssignmentOfficeHourView_notEqualNull() throws Exception {
    Course expectedCourse = new Course(1L,
            "course 1",
            "F20",
            "fname",
            "lname",
            "email");
    Tutor expectedTutor = new Tutor(1L,
            "Chris",
            "Gaucho",
            "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L,
            expectedCourse,
            expectedTutor,
            "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    RoomSlot expectedRoomSlot = new RoomSlot(1L,
            "The Library",
            "F20",
            DayOfWeek.WEDNESDAY,
            LocalTime.of(20, 0),
            LocalTime.of(22,0));

    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, expectedRoomSlot, "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    
    assertNotEquals(tutorAssignmentOfficeHourView, null);
  }

  @Test
  public void testTutorAssignmentOfficeHourView_notEqualAnotherClass() throws Exception {
    Course expectedCourse = new Course(1L,
            "course 1",
            "F20",
            "fname",
            "lname",
            "email");
    Tutor expectedTutor = new Tutor(1L,
            "Chris",
            "Gaucho",
            "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L,
            expectedCourse,
            expectedTutor,
            "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    RoomSlot expectedRoomSlot = new RoomSlot(1L,
            "The Library",
            "F20",
            DayOfWeek.WEDNESDAY,
            LocalTime.of(20, 0),
            LocalTime.of(22,0));

    OnlineOfficeHours expectedOnlineOfficeHours = new OnlineOfficeHours(1L, expectedTutorAssignments, expectedRoomSlot, "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(expectedOnlineOfficeHours);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    assertNotEquals(tutorAssignmentOfficeHourView, new Object());
  }

  @Test
  public void testTutorAssignmentOfficeHourView_equalsSelf() throws Exception {
    Course expectedCourse = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Tutor expectedTutor = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L, expectedCourse, expectedTutor, "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    RoomSlot expectedRoomSlot = new RoomSlot(1L,
            "The Library",
            "F20",
            DayOfWeek.WEDNESDAY,
            LocalTime.of(20, 0),
            LocalTime.of(22,0));

    OnlineOfficeHours expectedOnlineOfficeHours = new OnlineOfficeHours(1L, expectedTutorAssignments, expectedRoomSlot, "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(expectedOnlineOfficeHours);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    assertEquals(tutorAssignmentOfficeHourView, tutorAssignmentOfficeHourView);
  }

  @Test
  public void testTutorAssignmentOfficeHourView_toString() throws Exception {
    Course expectedCourse = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Tutor expectedTutor = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L, expectedCourse, expectedTutor, "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    RoomSlot expectedRoomSlot = new RoomSlot(1L,
            "The Library",
            "F20",
            DayOfWeek.WEDNESDAY,
            LocalTime.of(20, 0),
            LocalTime.of(22,0));

    OnlineOfficeHours expectedOnlineOfficeHours = new OnlineOfficeHours(1L, expectedTutorAssignments, expectedRoomSlot, "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(expectedOnlineOfficeHours);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);

    String expectedTutorAssignmentOutput =
            "{ " +
              "id='1', " +
              "course='Course[ id=1, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email ]', " +
              "tutor='{ id='1', firstName='Chris', lastName='Gaucho', email='cgaucho@ucsb.edu' }', " +
              "assignmentType='TA'" +
            " }";
    String expectedOnlineOfficeHoursOutput =
            "{ " +
              "id='1', " +
              "tutorAssignment='{ { id='1', course='Course[ id=1, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email ]', tutor='{ id='1', firstName='Chris', lastName='Gaucho', email='cgaucho@ucsb.edu' }', assignmentType='TA' } }', " +
              "roomSlot='{ { id='1', location='The Library', quarter='F20', start time='20:00', end time='22:00' } }', " +
              "zoomRoomLink='zoomLink', " +
              "notes='Scott closes the room early sometimes but he will still be on slack!'" +
            " }";
    
    assertEquals(tutorAssignmentOfficeHourView.toString(), "[tutorAssignment=" + expectedTutorAssignmentOutput + ", onlineOfficeHours=[" + expectedOnlineOfficeHoursOutput + "]]");
  }
}
