package edu.ucsb.ucsbcslas.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import net.codebox.javabeantester.JavaBeanTester;

public class TutorAssignmentModelTests {

    private TutorAssignmentModel tutorAssignmentTest;

    @BeforeEach
    public void setup() {
        tutorAssignmentTest = new TutorAssignmentModel("CMPSC 48", "20201", "Joe", "Gaucho", "joegaucho@ucsb.edu",
                "Joe", "Gaucho", "joegaucho@ucsb.edu", "LA");
    }

    @Test
    public void testGettersAndSetters() throws Exception {
        JavaBeanTester.test(TutorAssignmentModel.class);
    }

    @Test
    void testSetInstructorFirstName() throws Exception {
        tutorAssignmentTest.setIntructorFirstName("notJoe");
        assertEquals("notJoe", tutorAssignmentTest.getInstructorFirstName());
    }

    @Test
    void testSetInstructorLastName() throws Exception {
        tutorAssignmentTest.setIntructorLastName("notGaucho");
        assertEquals("notGaucho", tutorAssignmentTest.getInstructorLastName());
    }

    @Test
    void testSetInstructorEmail() throws Exception {
        tutorAssignmentTest.setIntructorEmail("NOTjoegaucho@ucsb.edu");
        assertEquals("NOTjoegaucho@ucsb.edu", tutorAssignmentTest.getInstructorEmail());
    }

    @Test
    public void test_notEqualNull() throws Exception {
        TutorAssignmentModel tam = new TutorAssignmentModel();
        assertNotEquals(tam, null);
    }

    @Test
    public void test_notEqualAnotherClass() throws Exception {
        TutorAssignmentModel tam = new TutorAssignmentModel();
        assertNotEquals(tam, new Object());
    }

    @Test
    public void test_equalsSelf() throws Exception {
        TutorAssignmentModel tam = new TutorAssignmentModel();
        assertEquals(tam, tam);
    }

    @Test
    public void test_equalsAnother() throws Exception {
        TutorAssignmentModel tam1 = new TutorAssignmentModel("CMPSC 48", "20201", "Joe", "Gaucho", "joegaucho@ucsb.edu",
                "Joe", "Gaucho", "joegaucho@ucsb.edu", "LA");
        TutorAssignmentModel tam2 = new TutorAssignmentModel("CMPSC 48", "20201", "Joe", "Gaucho", "joegaucho@ucsb.edu",
                "Joe", "Gaucho", "joegaucho@ucsb.edu", "LA");
        assertEquals(tam1, tam2);
    }

    @Test
    public void test_hashCode() throws Exception {
        TutorAssignmentModel tam1 = new TutorAssignmentModel("CMPSC 48", "20201", "Joe", "Gaucho", "joegaucho@ucsb.edu",
                "Joe", "Gaucho", "joegaucho@ucsb.edu", "LA");
        TutorAssignmentModel tam2 = new TutorAssignmentModel("CMPSC 48", "20201", "Joe", "Gaucho", "joegaucho@ucsb.edu",
                "Joe", "Gaucho", "joegaucho@ucsb.edu", "LA");
        assertEquals(tam1.hashCode(), tam2.hashCode());
    }

    @Test
    public void test_toString() throws Exception {
        TutorAssignmentModel tam = new TutorAssignmentModel("CMPSC 48", "20201", "Joe", "Gaucho", "joegaucho@ucsb.edu",
                "Joe", "Gaucho", "joegaucho@ucsb.edu", "LA");
        String expected = "{" + ", course='CMPSC 48'" + ", quarter='20201'" + ", instructorFirstName='Joe'"
                + ", instructorLastName='Gaucho'" + ", instructorEmail='joegaucho@ucsb.edu'" + ", tutorFirstName='Joe'"
                + ", tutorLastName='Gaucho'" + ", tutorEmail='joegaucho@ucsb.edu'" + ", assignmentType='LA'" + "}";
        assertEquals(expected, tam.toString());
    }

}
