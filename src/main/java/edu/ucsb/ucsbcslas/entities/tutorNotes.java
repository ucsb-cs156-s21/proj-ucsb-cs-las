package edu.ucsb.ucsbcslas.entities;

//import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

//import org.apache.commons.lang3.builder.EqualsBuilder;

import edu.ucsb.ucsbcslas.models.Course;

@Entity
public class tutorNotes {
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
}


