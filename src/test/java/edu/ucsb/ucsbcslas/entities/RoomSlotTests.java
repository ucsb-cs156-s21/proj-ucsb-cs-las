package edu.ucsb.ucsbcslas.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import net.codebox.javabeantester.JavaBeanTester;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.time.DayOfWeek;

public class RoomSlotTests {

  public static RoomSlot testRoomSlot;
  public static Long testId = 1L; // testId for the ActiveQuarter
  public static String testLocation = "Campus Point";
  public static ActiveQuarter testQuarter = new ActiveQuarter(testId, "F20");
  public static DayOfWeek testDayOfWeek = DayOfWeek.SATURDAY;
  public static LocalTime testStartTime = LocalTime.NOON;
  public static LocalTime testEndTime = LocalTime.MIDNIGHT;

  // test getter and setters
  @Test
  public void testGettersAndSetters() throws Exception {
    // See: https://github.com/codebox/javabean-tester
    JavaBeanTester.test(TutorAssignment.class);
  }

  // test equality
  @Test
  public void test_RoomSlot_EqualsSelf() {
    testRoomSlot = new RoomSlot();
    assertEquals(testRoomSlot, testRoomSlot);
  }

  @Test
  public void test_RoomSlot_NotEqualNull() {
    testRoomSlot = new RoomSlot();
    assertNotEquals(null, testRoomSlot);
  }

  @Test
  public void test_RoomSlot_NotEqualOtherType() {
    testRoomSlot = new RoomSlot();
    assertNotEquals(testRoomSlot, new Object());
  }

  @Test
  public void test_RoomSlot_EqualsCopy() {
    testRoomSlot = new RoomSlot();
    RoomSlot copy = testRoomSlot;
    assertEquals(testRoomSlot, copy);
  }

  // test constructors
  @Test
  public void test_RoomSlot_DefaultConstructor() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setId(testId);
    assertEquals(testId, testRoomSlot.getId());
    assertEquals(null, testRoomSlot.getLocation());
    assertEquals(null, testRoomSlot.getActiveQuarter());
    assertEquals(null, testRoomSlot.getDayOfWeek());
    assertEquals(null, testRoomSlot.getStartTime());
    assertEquals(null, testRoomSlot.getEndTime());
  }

  @Test
  public void test_RoomSlot_FullyOverloadedConstructor() {
    testRoomSlot = new RoomSlot(testLocation,
            testQuarter,
            testDayOfWeek,
            testStartTime,
            testEndTime);
    testRoomSlot.setId(testId);

    assertEquals(testId, testRoomSlot.getId());
    assertEquals(testLocation, testRoomSlot.getLocation());
    assertEquals(testQuarter, testRoomSlot.getActiveQuarter());
    assertEquals(testDayOfWeek, testRoomSlot.getDayOfWeek());
    assertEquals(testStartTime, testRoomSlot.getStartTime());
    assertEquals(testEndTime, testRoomSlot.getEndTime());
  }

  // test to-string
  @Test
  public void test_RoomSlot_ToString() {
    // test with default constructor
    testRoomSlot = new RoomSlot();
    testRoomSlot.setId(testId); // an normally auto-generated field
    String expected = "{" + " id='" + testId +"'"
            + ", location='null'"
            + ", quarter='null'"
            + ", start time='null'"
            + ", end time='null'"
            + "}";
    assertEquals(expected, testRoomSlot.toString());

    // test with fully overloaded constructor
    testRoomSlot = new RoomSlot(testLocation,
            testQuarter,
            testDayOfWeek,
            testStartTime,
            testEndTime);
    testRoomSlot.setId(testId); // an normally auto-generated field
    expected = "{" + " id='" + testId + "'"
            + ", location='" + testLocation + "'"
            + ", quarter='" + testQuarter + "'"
            + ", start time='" + testStartTime + "'"
            + ", end time='" + testEndTime + "'"
            + "}";
    assertEquals(expected, testRoomSlot.toString());
  }

}
