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
public class TutorNotes {
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
  private String message;

  public TutorNotes(Long id, Course course, Tutor tutor, String message) {
    this.id = id;
    this.course = course;
    this.tutor = tutor;
    this.message = message;
  }

  public TutorNotes() {
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

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;
    if (!(o instanceof TutorNotes)) {
      return false;
    }
    TutorNotes x = (TutorNotes) o;
    EqualsBuilder builder = new EqualsBuilder();
    builder.append(id, x.getId()).append(course, x.getCourse())
        .append(tutor, x.getTutor()).append(message, x.getMessage());
    return builder.build();
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, course, tutor, message);
  }

  @Override
  public String toString() {
    return "{" + " id='" + getId() + "'" + ", course='" + getCourse() + "'" + ", tutor='" + getTutor() + "'"
        + ", message='" + getMessage() + "'" + "}";
  }
}


