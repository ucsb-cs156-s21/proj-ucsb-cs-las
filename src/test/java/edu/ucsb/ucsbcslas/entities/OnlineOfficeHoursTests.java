package edu.ucsb.ucsbcslas.entities;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;
import net.codebox.javabeantester.JavaBeanTester;

public class OnlineOfficeHoursTests {

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
    OnlineOfficeHours ooh = new OnlineOfficeHours();
    assertEquals(ooh, ooh);
  }

  @Test
  public void test_equalsAnother() throws Exception {
    OnlineOfficeHours ooh1 =   new OnlineOfficeHours(1L, new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    OnlineOfficeHours ooh2 =   new OnlineOfficeHours(1L, new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    assertEquals(ooh1, ooh2);
  }

  @Test
  public void test_hashCode() throws Exception {
    OnlineOfficeHours ooh1 =   new OnlineOfficeHours(1L, new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    OnlineOfficeHours ooh2 =   new OnlineOfficeHours(1L, new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    assertEquals(ooh1.hashCode(), ooh2.hashCode());
  }

  @Test
  public void test_toString() throws Exception {
    OnlineOfficeHours ooh1 =   new OnlineOfficeHours(1L, new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    String expected = "{ id='1', tutorAssignment='{ id='null', course='null', tutor='null', assignmentType='null'}', dayOfWeek='Monday', startTime='12:00', endTime='13:00', zoomRoomLink='https://zoom.example.org/12345', notes='notes'}";
    assertEquals(expected, ooh1.toString());
  }

  @Test
  public void testWithoutID_equalsAnother() throws Exception {
    OnlineOfficeHours ooh1 =   new OnlineOfficeHours(new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    OnlineOfficeHours ooh2 =   new OnlineOfficeHours( new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    assertEquals(ooh1, ooh2);
  }

  @Test
  public void testWithoutID_hashCode() throws Exception {
    OnlineOfficeHours ooh1 =   new OnlineOfficeHours( new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    OnlineOfficeHours ooh2 =   new OnlineOfficeHours( new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    assertEquals(ooh1.hashCode(), ooh2.hashCode());
  }

  @Test
  public void testWithoutID_toString() throws Exception {
    OnlineOfficeHours ooh1 =   new OnlineOfficeHours( new TutorAssignment(), "Monday", "12:00", "13:00", "https://zoom.example.org/12345","notes");
    String expected = "{ id='null', tutorAssignment='{ id='null', course='null', tutor='null', assignmentType='null'}', dayOfWeek='Monday', startTime='12:00', endTime='13:00', zoomRoomLink='https://zoom.example.org/12345', notes='notes'}";
    assertEquals(expected, ooh1.toString());
  }

}
