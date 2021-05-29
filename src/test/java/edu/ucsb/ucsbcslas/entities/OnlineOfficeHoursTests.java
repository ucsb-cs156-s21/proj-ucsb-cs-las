package edu.ucsb.ucsbcslas.entities;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;
import net.codebox.javabeantester.JavaBeanTester;

import java.time.DayOfWeek;
import java.time.LocalTime;

public class OnlineOfficeHoursTests {

  // dummy office hour data
  Long testOfficeHourId = 1L;
  String testZoomRoomLink = "https://zoom.example.org/12345";
  String testNotes = "some notes :)";

  // dummy tutor data
  Long testTutorId = 1L;
  TutorAssignment testTutorAssignment;

  // dummy room slot data
  Long testRoomSlotId = 1L;
  String testRoomSlotLocation = "The Library";
  String testRoomSlotQuarter = "F21";
  DayOfWeek testRoomSlotDayOfWeek = DayOfWeek.MONDAY;
  LocalTime testRoomSlotStartTime = LocalTime.of(13, 0);
  LocalTime testRoomSlotEndTime = LocalTime.of(16, 0);

  RoomSlot testRoomSlot = new RoomSlot(testRoomSlotId,
          testRoomSlotLocation,
          testRoomSlotQuarter,
          testRoomSlotDayOfWeek,
          testRoomSlotStartTime,
          testRoomSlotEndTime);

  @Test
  public void testGettersAndSetters() throws Exception {
    // See: https://github.com/codebox/javabean-tester
    JavaBeanTester.test(OnlineOfficeHours.class);
  }

  @Test
  public void test_notEqualNull() throws Exception {
    OnlineOfficeHours ooh = new OnlineOfficeHours();
    assertNotEquals(ooh, null);
  }

  @Test
  public void test_notEqualAnotherClass() throws Exception {
    OnlineOfficeHours ooh = new OnlineOfficeHours();
    assertNotEquals(ooh, new Object());
  }

  @Test
  public void test_equalsSelf() throws Exception {
    OnlineOfficeHours ooh = new OnlineOfficeHours(testTutorId, testTutorAssignment, testRoomSlot, testZoomRoomLink, testNotes);
    assertEquals(ooh, ooh);
  }

  @Test
  public void test_equalsAnother() throws Exception {
    OnlineOfficeHours ooh1 = new OnlineOfficeHours(testTutorId, testTutorAssignment, testRoomSlot, testZoomRoomLink, testNotes);
    OnlineOfficeHours ooh2 = new OnlineOfficeHours(testTutorId, testTutorAssignment, testRoomSlot, testZoomRoomLink, testNotes);
    assertEquals(ooh1, ooh2);
  }

  @Test
  public void test_hashCode() throws Exception {
    OnlineOfficeHours ooh1 = new OnlineOfficeHours(testTutorId, testTutorAssignment, testRoomSlot, testZoomRoomLink, testNotes);
    OnlineOfficeHours ooh2 = new OnlineOfficeHours(testTutorId, testTutorAssignment, testRoomSlot, testZoomRoomLink, testNotes);
    assertEquals(ooh1.hashCode(), ooh2.hashCode());
  }

  @Test
  public void test_toString() throws Exception {
    OnlineOfficeHours ooh1 = new OnlineOfficeHours(testTutorId, testTutorAssignment, testRoomSlot, testZoomRoomLink, testNotes);
    String expected = "{ id='" + testOfficeHourId + "', " +
            "tutorAssignment='{ " + testTutorAssignment +" }', " +
            "roomSlot='{ " + testRoomSlot + " }', " +
            "zoomRoomLink='" + testZoomRoomLink + "', " +
            "notes='" + testNotes + "' }";
    assertEquals(expected, ooh1.toString());
  }

}
