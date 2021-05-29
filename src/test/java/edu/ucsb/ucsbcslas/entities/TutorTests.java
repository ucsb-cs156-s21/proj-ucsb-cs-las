package edu.ucsb.ucsbcslas.entities;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;

import net.codebox.javabeantester.JavaBeanTester;

public class TutorTests {

  @Test
  public void testGettersAndSetters() throws Exception {
    // See: https://github.com/codebox/javabean-tester
    JavaBeanTester.test(Tutor.class);
  }

  @Test
  public void test_notEqualNull() throws Exception {
    Tutor t = new Tutor();
    assertNotEquals(t, null);
  }

  @Test
  public void test_notEqualAnotherClass() throws Exception {
    Tutor t = new Tutor();
    assertNotEquals(t, new Object());
  }

  @Test
  public void test_equalsSelf() throws Exception {
    Tutor t = new Tutor();
    assertEquals(t, t);
  }

  @Test
  public void test_equalsAnother() throws Exception {
    Tutor t1 = new Tutor(1L, "Chris", "Gaucho", "cgaucho@example.org");
    Tutor t2 = new Tutor(1L, "Chris", "Gaucho", "cgaucho@example.org");
    assertEquals(t1, t2);
  }

  @Test
  public void test_hashCode() throws Exception {
    Tutor t1 = new Tutor(1L, "Chris", "Gaucho", "cgaucho@example.org");
    Tutor t2 = new Tutor(1L, "Chris", "Gaucho", "cgaucho@example.org");
    assertEquals(t1.hashCode(), t2.hashCode());
  }

  @Test
  public void test_toString() throws Exception {
    Tutor t1 = new Tutor(1L, "Chris", "Gaucho", "cgaucho@example.org");
    String expected = "{ id='1', firstName='Chris', lastName='Gaucho', email='cgaucho@example.org'}";
    assertEquals(expected, t1.toString());
  }

  @Test
  public void testWithoutID_equalsAnother() throws Exception {
    Tutor t1 = new Tutor("Chris", "Gaucho", "cgaucho@example.org");
    Tutor t2 = new Tutor("Chris", "Gaucho", "cgaucho@example.org");
    assertEquals(t1, t2);
  }

  @Test
  public void testWithoutID_hashCode() throws Exception {
    Tutor t1 = new Tutor("Chris", "Gaucho", "cgaucho@example.org");
    Tutor t2 = new Tutor("Chris", "Gaucho", "cgaucho@example.org");
    assertEquals(t1.hashCode(), t2.hashCode());
  }

  @Test
  public void testWithoutID_toString() throws Exception {
    Tutor t1 = new Tutor( "Chris", "Gaucho", "cgaucho@example.org");
    String expected = "{ id='null', firstName='Chris', lastName='Gaucho', email='cgaucho@example.org'}";
    assertEquals(expected, t1.toString());
  }

}
