package edu.ucsb.ucsbcslas.entities;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;

import edu.ucsb.ucsbcslas.models.Course;
import net.codebox.javabeantester.JavaBeanTester;

public class TutorNotesTests {

  @Test
  public void testGettersAndSetters() throws Exception {
    // See: https://github.com/codebox/javabean-tester
    JavaBeanTester.test(TutorNotes.class);
  }

  @Test
  public void test_notEqualNull() throws Exception {
    TutorNotes ta = new TutorNotes();
    assertNotEquals(ta, null);
  }

  @Test
  public void test_notEqualAnotherClass() throws Exception {
    TutorNotes ta = new TutorNotes();
    assertNotEquals(ta, new Object());
  }

  @Test
  public void test_equalsSelf() throws Exception {
    TutorNotes ta = new TutorNotes();
    assertEquals(ta, ta);
  }

  @Test
  public void test_equalsAnother() throws Exception {
    TutorNotes ta1 = new TutorNotes(1L, new Course(), new Tutor(), "Random Message");
    TutorNotes ta2 = new TutorNotes(1L, new Course(), new Tutor(), "Random Message");
    assertEquals(ta1, ta2);
  }

  @Test
  public void test_hashCode() throws Exception {
    TutorNotes ta1 = new TutorNotes(1L, new Course(), new Tutor(), "Random Message");
    TutorNotes ta2 = new TutorNotes(1L, new Course(), new Tutor(), "Random Message");
    assertEquals(ta1.hashCode(), ta2.hashCode());
  }

  @Test
  public void test_toString() throws Exception {
    TutorNotes ta1 = new TutorNotes(1L, new Course(), new Tutor(), "Random Message");
    String expected = "{ id='1', course='Course[ id=null, name=null, quarter=null, instructorFirstName=null, instructorLastName=null, instructorEmail=null ]', tutor='{ id='null', firstName='null', lastName='null', email='null'}', message='Random Message'}";
    assertEquals(expected, ta1.toString());
  }

}
