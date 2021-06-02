package edu.ucsb.ucsbcslas.models;

import java.util.Objects;

import javax.persistence.Column;

import com.opencsv.bean.CsvBindByPosition;
import org.apache.commons.lang3.builder.EqualsBuilder;

public class TutorAssignmentModel {

    @CsvBindByPosition(position = 0)
    private String courseName;
    @CsvBindByPosition(position = 1)
    private String quarter;
    @CsvBindByPosition(position = 2)
    private String instructorFirstName;
    @CsvBindByPosition(position = 3)
    private String instructorLastName;
    @CsvBindByPosition(position = 4)
    private String instructorEmail;
    @CsvBindByPosition(position = 5)
    private String tutorFirstName;
    @CsvBindByPosition(position = 6)
    private String tutorLastName;
    @CsvBindByPosition(position = 7)
    private String tutorEmail;
    @CsvBindByPosition(position = 8)
    private String assignmentType;

    public TutorAssignmentModel() {
    }

    public TutorAssignmentModel(String courseName, String quarter, String instructorFirstName,
            String instructorLastName, String instructorEmail, String tutorFirstName, String tutorLastName,
            String tutorEmail, String assignmentType) {
        this.courseName = courseName.trim();
        this.quarter = quarter.trim();
        this.instructorFirstName = instructorFirstName.trim();
        this.instructorLastName = instructorLastName.trim();
        this.instructorEmail = instructorEmail.trim();
        this.tutorEmail = tutorEmail.trim();
        this.tutorLastName = tutorLastName.trim();
        this.tutorFirstName = tutorFirstName.trim();
        this.assignmentType = assignmentType.trim();

    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        TutorAssignmentModel other = (TutorAssignmentModel) obj;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(courseName, other.courseName).append(quarter, other.quarter)
                .append(instructorFirstName, other.instructorFirstName)
                .append(instructorLastName, other.instructorLastName).append(instructorEmail, other.instructorEmail)
                .append(tutorFirstName, other.tutorFirstName).append(tutorLastName, other.tutorLastName)
                .append(tutorEmail, other.tutorEmail).append(assignmentType, other.assignmentType);
        return builder.isEquals();
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName.trim();
    }

    public String getQuarter() {
        return quarter;
    }

    public void setQuarter(String quarter) {
        this.quarter = quarter.trim();
    }

    public String getTutorFirstName() {
        return tutorFirstName;
    }

    public void setTutorFirstName(String tutorFirstName) {
        this.tutorFirstName = tutorFirstName.trim();
    }

    public String getTutorLastName() {
        return tutorLastName;
    }

    public void setTutorLastName(String tutorLastName) {
        this.tutorLastName = tutorLastName.trim();
    }

    public String getTutorEmail() {
        return tutorEmail;
    }

    public void setTutorEmail(String tutorEmail) {
        this.tutorEmail = tutorEmail.trim();
    }

    public String getAssignmentType() {
        return assignmentType;
    }

    public void setAssignmentType(String assignmentType) {
        this.assignmentType = assignmentType.trim();
    }

    public void setIntructorFirstName(String instructorFirstName) {
        this.instructorFirstName = instructorFirstName.trim();
    }

    public String getInstructorFirstName() {
        return instructorFirstName;
    }

    public void setIntructorLastName(String instructorLastName) {
        this.instructorLastName = instructorLastName.trim();
    }

    public String getInstructorLastName() {
        return instructorLastName;
    }

    public void setIntructorEmail(String instructorEmail) {
        this.instructorEmail = instructorEmail.trim();
    }

    public String getInstructorEmail() {
        return instructorEmail;
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseName, quarter, instructorFirstName, instructorLastName, instructorEmail,
                tutorFirstName, tutorLastName, tutorEmail, assignmentType);
    }

    @Override
    public String toString() {
        return "{" + ", course='" + getCourseName() + "'" + ", quarter='" + getQuarter() + "'"
                + ", instructorFirstName='" + getInstructorFirstName() + "'" + ", instructorLastName='"
                + getInstructorLastName() + "'" + ", instructorEmail='" + getInstructorEmail() + "'"
                + ", tutorFirstName='" + getTutorFirstName() + "'" + ", tutorLastName='" + getTutorLastName() + "'"
                + ", tutorEmail='" + getTutorEmail() + "'" + ", assignmentType='" + getAssignmentType() + "'" + "}";
    }

}
