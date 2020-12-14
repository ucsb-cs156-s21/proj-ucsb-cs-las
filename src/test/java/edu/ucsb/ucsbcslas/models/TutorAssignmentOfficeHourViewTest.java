package edu.ucsb.ucsbcslas.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;

public class TutorAssignmentOfficeHourViewTest {
  @Test
  public void testTutorAssignmentOfficeHourView_notEqualNull() throws Exception {
    Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L, c, t, "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, "Tuesday", "4:00 PM", "6:00 PM", "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    
    assertNotEquals(tutorAssignmentOfficeHourView, null);
  }

  @Test
  public void testTutorAssignmentOfficeHourView_notEqualAnotherClass() throws Exception {
    Course c = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    Tutor t = new Tutor(1L, "Chris", "Gaucho", "cgaucho@ucsb.edu");
    TutorAssignment expectedTutorAssignments = new TutorAssignment(1L, c, t, "TA");
    List<OnlineOfficeHours> expectedOnlineOfficeHoursList = new ArrayList<>();
    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, "Tuesday", "4:00 PM", "6:00 PM", "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
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
    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, "Tuesday", "4:00 PM", "6:00 PM", "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
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
    OnlineOfficeHours onlineOfficeHours_1 = new OnlineOfficeHours(1L, expectedTutorAssignments, "Tuesday", "4:00 PM", "6:00 PM", "zoomLink", "Scott closes the room early sometimes but he will still be on slack!");
    expectedOnlineOfficeHoursList.add(onlineOfficeHours_1);
    TutorAssignmentOfficeHourView tutorAssignmentOfficeHourView = new TutorAssignmentOfficeHourView(expectedTutorAssignments,expectedOnlineOfficeHoursList);
    String tutorAssignmentExpected = "{ id='1', course='Course[ id=1, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email ]', tutor='{ id='1', firstName='Chris', lastName='Gaucho', email='cgaucho@ucsb.edu'}', assignmentType='TA'},";
    String onlineOfficeHourExpected = "{ id='1', tutorAssignment='{ id='1', course='Course[ id=1, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email ]', tutor='{ id='1', firstName='Chris', lastName='Gaucho', email='cgaucho@ucsb.edu'}', assignmentType='TA'}', dayOfWeek='Tuesday', startTime='4:00 PM', endTime='6:00 PM', zoomRoomLink='zoomLink', notes='Scott closes the room early sometimes but he will still be on slack!'}";
    assertEquals(tutorAssignmentOfficeHourView.toString(), "[tutorAssignment="+tutorAssignmentExpected+" onlineOfficeHours=["+ onlineOfficeHourExpected+"]]" );
  }
}
