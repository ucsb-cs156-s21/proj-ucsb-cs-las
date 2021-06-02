package edu.ucsb.ucsbcslas.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.time.DayOfWeek;

public class RoomSlotTests {

  public static RoomSlot testRoomSlot;
  public static Long testId = 1L; // testId for the ActiveQuarter
  public static String testLocation = "Campus Point";
  public static String testQuarter = "20212";
  public static DayOfWeek testDayOfWeek = DayOfWeek.SATURDAY;
  public static LocalTime testStartTime = LocalTime.NOON;
  public static LocalTime testEndTime = LocalTime.MIDNIGHT;

  // test getter and setters
  @Test
  public void test_RoomSlot_GetAndSetId() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setId(testId);
    assertEquals(testId, testRoomSlot.getId());
  }

  @Test
  public void test_RoomSlot_GetAndSetLocation() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setLocation(testLocation);
    assertEquals(testLocation, testRoomSlot.getLocation());
  }

  @Test
  public void test_RoomSlot_GetAndSetQuarter() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setQuarter(testQuarter);
    assertEquals(testQuarter, testRoomSlot.getQuarter());
  }

  @Test
  public void test_RoomSlot_GetAndSetDayOfWeek() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setDayOfWeek(testDayOfWeek);
    assertEquals(testDayOfWeek, testRoomSlot.getDayOfWeek());
  }

  @Test
  public void test_RoomSlot_GetAndSetStartTime() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setStartTime(testStartTime);
    assertEquals(testStartTime, testRoomSlot.getStartTime());
  }

  @Test
  public void test_RoomSlot_GetAndSetEndTime() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setEndTime(testEndTime);
    assertEquals(testEndTime, testRoomSlot.getEndTime());
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
    RoomSlot copy = new RoomSlot();
    assertEquals(testRoomSlot, copy);
  }

  // test constructors
  @Test
  public void test_RoomSlot_DefaultConstructor() {
    testRoomSlot = new RoomSlot();
    assertEquals(null, testRoomSlot.getId());
    assertEquals(null, testRoomSlot.getLocation());
    assertEquals(null, testRoomSlot.getQuarter());
    assertEquals(null, testRoomSlot.getDayOfWeek());
    assertEquals(null, testRoomSlot.getStartTime());
    assertEquals(null, testRoomSlot.getEndTime());
  }

  @Test
  public void test_RoomSlot_OverloadedIDConstructor() {
    testRoomSlot = new RoomSlot(testId);
    assertEquals(testId, testRoomSlot.getId());
  }

  @Test
  public void test_RoomSlot_OverloadedAllConstructor() {
    testRoomSlot = new RoomSlot(testId,
            testLocation,
            testQuarter,
            testDayOfWeek,
            testStartTime,
            testEndTime);

    assertEquals(testId, testRoomSlot.getId());
    assertEquals(testLocation, testRoomSlot.getLocation());
    assertEquals(testQuarter, testRoomSlot.getQuarter());
    assertEquals(testDayOfWeek, testRoomSlot.getDayOfWeek());
    assertEquals(testStartTime, testRoomSlot.getStartTime());
    assertEquals(testEndTime, testRoomSlot.getEndTime());
  }

  // to-string
  @Test
  public void test_RoomSlot_ToString() {
    testRoomSlot = new RoomSlot();
    String expected = "{" + " id='null'"
            + ", location='null'"
            + ", quarter='null'"
            + ", start time='null'"
            + ", end time='null'"
            + "}";
    assertEquals(expected, testRoomSlot.toString());

    testRoomSlot = new RoomSlot(testId);
    expected = "{" + " id='" + testId + "'"
            + ", location='null'"
            + ", quarter='null'"
            + ", start time='null'"
            + ", end time='null'"
            + "}";
    assertEquals(expected, testRoomSlot.toString());

    testRoomSlot = new RoomSlot(testId,
            testLocation,
            testQuarter,
            testDayOfWeek,
            testStartTime,
            testEndTime);
    expected = "{" + " id='" + testId + "'"
            + ", location='" + testLocation + "'"
            + ", quarter='" + testQuarter + "'"
            + ", start time='" + testStartTime + "'"
            + ", end time='" + testEndTime + "'"
            + "}";
    assertEquals(expected, testRoomSlot.toString());
  }

}
