package edu.ucsb.ucsbcslas.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class RoomSlotTests {

  // test getter and setters
  @Test
  public void test_RoomSlot_GetAndSetLocation() {
    RoomSlot testRoomSlot = new RoomSlot();
    testRoomSlot.setLocation("Campus Point");
    assertEquals("Campus Point", testRoomSlot.getLocation());
  }

  @Test
  public void test_RoomSlot_GetAndSetQuarter() {
    RoomSlot testRoomSlot = new RoomSlot();
    testRoomSlot.setActiveQuarter(ActiveQuarter(1L, "Campus Point"));
    assertEquals("Campus Point", testRoomSlot.getLocation());
  }

  @Test
  public void test_RoomSlot_GetAndSetLocation() {
    RoomSlot testRoomSlot = new RoomSlot();
    testRoomSlot.setLocation("Campus Point");
    assertEquals("Campus Point", testRoomSlot.getLocation());
  }

  @Test
  public void test_RoomSlot_GetAndSetLocation() {
    RoomSlot testRoomSlot = new RoomSlot();
    testRoomSlot.setLocation("Campus Point");
    assertEquals("Campus Point", testRoomSlot.getLocation());
  }

  @Test
  public void test_RoomSlot_GetAndSetLocation() {
    RoomSlot testRoomSlot = new RoomSlot();
    testRoomSlot.setLocation("Campus Point");
    assertEquals("Campus Point", testRoomSlot.getLocation());
  }

  // test equality
  @Test
  public void test_RoomSlot_Equality() {
    RoomSlot testRoomSlot = new RoomSlot();
    testRoomSlot.setLocation("Campus Point");
    assertEquals("Campus Point", testRoomSlot.getLocation());
  }

  // test overloaded constructor with all fields
  @Test
  public void test_RoomSlot_OverloadedConstructor() {
    RoomSlot testRoomSlot = new RoomSlot("The Lagoon", ActiveQuarter(id, "S21"),
      DayOfWeek.Saturday,
      LocalTime.parse("13:00:00", DateTimeFormatter.ISO_TIME),
      LocalTime.parse("14:00:00", DateTimeFormatter.ISO_TIME));
  }





  @Test
  public void testActiveQuarter_getAndSetId() {
    ActiveQuarter q = new ActiveQuarter();
    q.setId(4L);
    assertEquals(4L, q.getId());
  }

  @Test
  public void testActiveQuarter_notEqualNull() {
    ActiveQuarter q = new ActiveQuarter();
    assertNotEquals(q, null);
  }

  @Test
  public void testActiveQuarter_notEqualDifferentClass() {
    ActiveQuarter q = new ActiveQuarter();
    assertNotEquals(q, new Object());
  }

  @Test
  public void testAdmin_equalsSelf() {
    ActiveQuarter q = new ActiveQuarter();
    assertEquals(q, q);
  }

  @Test
  public void testAdmin_equalsCopy() {
    ActiveQuarter q1 = new ActiveQuarter();
    ActiveQuarter q2 = new ActiveQuarter();
    assertEquals(q1, q2);
  }

}
