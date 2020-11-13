package edu.ucsb.changeme.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class CourseTests {
  @Test
  public void testCourse_notEqualNull() throws Exception {
    Course course = new Course(1L, "course 1", "F20", "fname", "lname", "email", "123456");
    assertNotEquals(course, null);
  }

  @Test
  public void testCourse_notEqualAnotherClass() throws Exception {
    Course course = new Course(1L, "course 1", "F20", "fname", "lname", "email", "123456");
    assertNotEquals(course, new Object());
  }

  @Test
  public void testCourse_equalsSelf() throws Exception {
    Course course = new Course(1L, "course 1", "F20", "fname", "lname", "email", "123456");
    assertEquals(course, course);
  }

  @Test
  public void testCourse_toString() throws Exception {
    Course course = new Course(1L, "course 1", "F20", "fname", "lname", "email", "123456");
    assertEquals(course.toString(), "Course[ id=1, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email, userId=123456 ]");
  }
}
