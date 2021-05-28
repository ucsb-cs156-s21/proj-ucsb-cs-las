package edu.ucsb.ucsbcslas.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

public class ActiveQuarterTests {
  @Test
  public void testQuarter_toString() {
    ActiveQuarter q = new ActiveQuarter(1L, "F20");
    assertEquals("{ id='1', activeQuarter='F20'}", q.toString());

    Admin admin2 = new Admin("admin@test.org");
    assertEquals("Admin[ id=0, email=admin@test.org, isPermanentAdmin=false ]", admin2.toString());
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
