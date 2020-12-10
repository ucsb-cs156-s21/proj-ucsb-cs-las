package edu.ucsb.ucsbcslas.documents;

import org.junit.jupiter.api.Test;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import net.codebox.javabeantester.JavaBeanTester;

public class LoginTests {

    @Test
    public void testGettersAndSetters() throws Exception {
        // See: https://github.com/codebox/javabean-tester
        // The classes that should NOT be tested with the Bean are the
        // ones that set and get List<> instances
        JavaBeanTester.test(Login.class);
    }

    @Test
    public void testConstructor() throws Exception {
        Login l = new Login("5:55", "testEmail@ucsb.edu", "matt", "wong");

    }

    @Test
    public void test_notEqualNull() throws Exception {
        Login l = new Login();
        assertNotEquals(l, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        Login l = new Login();
        assertNotEquals(l, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        Login l = new Login("5:55", "testEmail@ucsb.edu", "matt", "wong");
        assertEquals(l, l);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        Login l1 = new Login("5:55", "testEmail@ucsb.edu", "matt", "wong");
        Login l2 = new Login("5:55", "testEmail@ucsb.edu", "matt", "wong");
        assertEquals(l1, l2);
    }

    @Test
    public void test_hashCode() throws Exception {
        Login l1 = new Login("5:55", "testEmail@ucsb.edu", "matt", "wong");
        Login l2 = new Login("5:55", "testEmail@ucsb.edu", "matt", "wong");
        assertEquals(l1.hashCode(), l2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        Login l = new Login("5:55", "testEmail@ucsb.edu", "matt", "wong");
        assertEquals("{ timestamp='5:55', email='testEmail@ucsb.edu', firstName='matt', lastName='wong'}",l.toString());
    }

}