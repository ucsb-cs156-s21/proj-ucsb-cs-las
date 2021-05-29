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
    Course course = new Course(1L,
            "course 1",
            "F20",
            "fname",
            "lname",
            "email");
    Tutor tutor = new Tutor(1L,
            "Chris",
            "Gaucho",
            "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L,
            course,
            tutor,
            "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    RoomSlot roomSlot = new RoomSlot(1L,
            "The Library",
            new ActiveQuarter("F20"),
            DayOfWeek.WEDNESDAY,
            LocalTime.of(20, 0),
            LocalTime.of(22,0));

    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, roomSlot, "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    
    assertNotEquals(tutorAssignmentOfficeHourView, null);
  }

  @Test
  public void testTutorAssignmentOfficeHourView_notEqualAnotherClass() throws Exception {
    Course course = new Course(1L,
            "course 1",
            "F20",
            "fname",
            "lname",
            "email");
    Tutor tutor = new Tutor(1L,
            "Chris",
            "Gaucho",
            "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L,
            course,
            tutor,
            "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    RoomSlot roomSlot = new RoomSlot(1L,
            "The Library",
            new ActiveQuarter("F20"),
            DayOfWeek.WEDNESDAY,
            LocalTime.of(20, 0),
            LocalTime.of(22,0));

    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, roomSlot, "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    assertNotEquals(tutorAssignmentOfficeHourView, new Object());
  }

  @Test
  public void testTutorAssignmentOfficeHourView_equalsSelf() throws Exception {
    Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L, c, t, "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    RoomSlot roomSlot = new RoomSlot(1L,
            "The Library",
            new ActiveQuarter("F20"),
            DayOfWeek.WEDNESDAY,
            LocalTime.of(20, 0),
            LocalTime.of(22,0));

    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, roomSlot, "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    assertEquals(tutorAssignmentOfficeHourView, tutorAssignmentOfficeHourView);
  }

  @Test
  public void testTutorAssignmentOfficeHourView_toString() throws Exception {
    Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L, c, t, "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    RoomSlot roomSlot = new RoomSlot(1L,
            "The Library",
            new ActiveQuarter("F20"),
            DayOfWeek.WEDNESDAY,
            LocalTime.of(20, 0),
            LocalTime.of(22,0));

    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, roomSlot, "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    String tutorAssignmentExpected =
            "{ " +
              "id='1', " +
              "course='Course[ id=1, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email ]', " +
              "tutor='{ id='1', firstName='Chris', lastName='Gaucho', email='cgaucho@ucsb.edu'}', " +
              "assignmentType='TA'" +
            " },";
    String onlineOfficeHourExpected =
            "{ " +
              "id='1', " +
              "tutorAssignment='{ id='1', course='Course[ id=1, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email ]', tutor='{ id='1', firstName='Chris', lastName='Gaucho', email='cgaucho@ucsb.edu' }, assignmentType='TA' }, " +
              "roomSlot='{ id='1', location='The Library', quarter='F20', start time='8:00 PM', end time='10:00 PM' }, " +
              "zoomRoomLink='zoomLink', " +
              "notes='notes'" +
            " }";
    
    assertEquals(tutorAssignmentOfficeHourView.toString(), "[tutorAssignment=" + tutorAssignmentExpected + " onlineOfficeHours=[" + onlineOfficeHourExpected + "]]" );
  }
}
