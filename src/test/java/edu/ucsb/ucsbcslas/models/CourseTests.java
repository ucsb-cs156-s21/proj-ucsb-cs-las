package edu.ucsb.ucsbcslas.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class CourseTests {
  @Test
  public void testCourse_notEqualNull() throws Exception {
    Course course = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    assertNotEquals(course, null);
  }

  @Test
  public void testCourse_notEqualAnotherClass() throws Exception {
    Course course = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    assertNotEquals(course, new Object());
  }

  @Test
  public void testCourse_equalsSelf() throws Exception {
    Course course = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    assertEquals(course, course);
  }

  @Test
  public void testCourse_toString() throws Exception {
    Course course = new Course(1L, "course 1", "F20", "fname", "lname", "email");
    assertEquals(course.toString(), "Course[ id=1, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email ]");
  }


  @Test
  public void testCourseWithoutID_notEqualNull() throws Exception {
    Course course = new Course("course 1", "F20", "fname", "lname", "email");
    assertNotEquals(course, null);
  }

  @Test
  public void testCourseWithoutID_notEqualAnotherClass() throws Exception {
    Course course = new Course("course 1", "F20", "fname", "lname", "email");
    assertNotEquals(course, new Object());
  }

  @Test
  public void testCourseWithoutID_equalsSelf() throws Exception {
    Course course = new Course("course 1", "F20", "fname", "lname", "email");
    assertEquals(course, course);
  }

  @Test
  public void testCourseWithoutID_toString() throws Exception {
    Course course = new Course("course 1", "F20", "fname", "lname", "email");
    assertEquals(course.toString(), "Course[ id=null, name=course 1, quarter=F20, instructorFirstName=fname, instructorLastName=lname, instructorEmail=email ]");
  }
}
