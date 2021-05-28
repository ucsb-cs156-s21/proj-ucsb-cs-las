package edu.ucsb.ucsbcslas.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.apache.commons.lang3.builder.EqualsBuilder;

import edu.ucsb.ucsbcslas.models.Course;

@Entity
public class TutorAssignment {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "course_id")
  private Course course;

  @ManyToOne
  @JoinColumn(name = "tutor_id")
  private Tutor tutor;

  @Column(nullable = false)
  private String assignmentType;

  public TutorAssignment(Course course, Tutor tutor, String assignmentType) {
    this.course = course;
    this.tutor = tutor;
    this.assignmentType = assignmentType;
  }

  public TutorAssignment(Long id, Course course, Tutor tutor, String assignmentType) {
    this.id = id;
    this.course = course;
    this.tutor = tutor;
    this.assignmentType = assignmentType;
  }

  public TutorAssignment() {
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Course getCourse() {
    return this.course;
  }

  public void setCourse(Course course) {
    this.course = course;
  }

  public Tutor getTutor() {
    return this.tutor;
  }

  public void setTutor(Tutor tutor) {
    this.tutor = tutor;
  }

  public String getAssignmentType() {
    return this.assignmentType;
  }

  public void setAssignmentType(String assignmentType) {
    this.assignmentType = assignmentType;
  }

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;
    if (!(o instanceof TutorAssignment)) {
      return false;
    }
    TutorAssignment tutorAssignment = (TutorAssignment) o;
    EqualsBuilder builder = new EqualsBuilder();
    builder.append(id, tutorAssignment.getId()).append(course, tutorAssignment.getCourse())
        .append(tutor, tutorAssignment.getTutor()).append(assignmentType, tutorAssignment.getAssignmentType());
    return builder.build();
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, course, tutor, assignmentType);
  }

  @Override
  public String toString() {
    return "{" + " id='" + getId() + "'" + ", course='" + getCourse() + "'" + ", tutor='" + getTutor() + "'"
        + ", assignmentType='" + getAssignmentType() + "'" + "}";
  }

}
