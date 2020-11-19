package edu.ucsb.ucsbcslas.entities;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;

import edu.ucsb.ucsbcslas.models.Course;
import net.codebox.javabeantester.JavaBeanTester;

public class TutorAssignmentTests {

  @Test
  public void testGettersAndSetters() throws Exception {
    // See: https://github.com/codebox/javabean-tester
    JavaBeanTester.test(TutorAssignment.class);
  }

  @Test
  public void test_notEqualNull() throws Exception {
    TutorAssignment ta = new TutorAssignment();
    assertNotEquals(ta, null);
  }

  @Test
  public void test_notEqualAnotherClass() throws Exception {
    TutorAssignment ta = new TutorAssignment();
    assertNotEquals(ta, new Object());
  }

  @Test
  public void test_equalsSelf() throws Exception {
    TutorAssignment ta = new TutorAssignment();
    assertEquals(ta, ta);
  }

  @Test
  public void test_equalsAnother() throws Exception {
    TutorAssignment ta1 = new TutorAssignment(1L, new Course(), new Tutor(), "190J");
    TutorAssignment ta2 = new TutorAssignment(1L, new Course(), new Tutor(), "190J");
    assertEquals(ta1, ta2);
  }

  @Test
  public void test_hashCode() throws Exception {
    TutorAssignment ta1 = new TutorAssignment(1L, new Course(), new Tutor(), "190J");
    TutorAssignment ta2 = new TutorAssignment(1L, new Course(), new Tutor(), "190J");
    assertEquals(ta1.hashCode(), ta2.hashCode());
  }

  @Test
  public void test_toString() throws Exception {
    TutorAssignment ta1 = new TutorAssignment(1L, new Course(), new Tutor(), "190J");
    String expected = "{ id='1', course='Course[ id=null, name=null, quarter=null, instructorFirstName=null, instructorLastName=null, instructorEmail=null ]', tutor='{ id='null', firstName='null', lastName='null', email='null'}', assignmentType='190J'}";
    assertEquals(expected, ta1.toString());
  }

}
