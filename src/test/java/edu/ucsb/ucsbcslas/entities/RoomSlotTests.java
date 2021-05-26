package edu.ucsb.ucsbcslas.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;
import java.time.LocalTime;
import java.time.DayOfWeek;

public class RoomSlotTests {

  public static RoomSlot testRoomSlot;
  public static Long testId; // testId for the ActiveQuarter
  public static String testLocation = "Campus Point";
  public static ActiveQuarter testQuarter = new ActiveQuarter(testId, "Campus Point");
  public static DayOfWeek testDayOfWeek = DayOfWeek.SATURDAY;
  public static LocalTime testStartTime = LocalTime.NOON;
  public static LocalTime testEndTime = LocalTime.MIDNIGHT;

  // test getter and setters
  @Test
  public void test_RoomSlot_GetAndSetLocation() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setLocation(testLocation);
    assertEquals(testLocation, testRoomSlot.getLocation());
  }

  @Test
  public void test_RoomSlot_GetAndSetQuarter() {
    testRoomSlot = new RoomSlot();
    testRoomSlot.setActiveQuarter(testQuarter);
    assertEquals(testQuarter, testRoomSlot.getLocation());
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
    assertEquals(testEndTime, testRoomSlot.getLocation());
  }

  // test overloaded constructor with all fields
  @Test
  public void test_RoomSlot_OverloadedConstructor() {
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

}
