package edu.ucsb.ucsbcslas.models;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.apache.commons.lang3.builder.EqualsBuilder;

@Entity
public class Course {
  private static String activeQuarter = "";
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private String quarter;
  @Column(nullable = false)
  private String instructorFirstName;
  @Column(nullable = false)
  private String instructorLastName;
  @Column(nullable = false)
  private String instructorEmail;

  public Course() {
  }

  public Course(Long id, String name, String quarter, String instructorFirstName, String instructorLastName, String instructorEmail) {
    this.id = id;
    this.name = name;
    this.quarter = quarter;
    this.instructorFirstName = instructorFirstName;
    this.instructorLastName = instructorLastName;
    this.instructorEmail = instructorEmail;
  }

  @Override
  public String toString() {
    return String.format("Course[ id=%d, name=%s, quarter=%s, instructorFirstName=%s, instructorLastName=%s, instructorEmail=%s ]", id, name, quarter, instructorFirstName, instructorLastName, instructorEmail);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null || getClass() != obj.getClass())
      return false;
    Course other = (Course) obj;

    // Using EqualsBuilder cuts down on the number of branches/tests we end up having to write.
    // Instead of needing to test equals failing on a difference in every single field, we can
    // just test one difference.
    EqualsBuilder builder = new EqualsBuilder();
    builder.append(id, other.id).append(name, other.name).append(quarter, other.quarter)
      .append(instructorFirstName, other.instructorFirstName)
      .append(instructorLastName, other.instructorLastName).append(instructorEmail, other.instructorEmail);
    return builder.isEquals();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getQuarter() {
    return quarter;
  }

  public void setQuarter(String quarter) {
    this.quarter = quarter;
  }

  public String getInstructorFirstName() {
    return instructorFirstName;
  }

  public void setInstructorFirstName(String instructorFirstName) {
    this.instructorFirstName = instructorFirstName;
  }
  
  public String getInstructorLastName() {
    return instructorLastName;
  }

  public void setInstructorLastName(String instructorLastName) {
    this.instructorLastName = instructorLastName;
  }

  public String getInstructorEmail() {
    return instructorEmail;
  }

  public void setInstructorEmail(String instructorEmail) {
    this.instructorEmail = instructorEmail;
  }
  public static void setActiveQuarter(String q){
    activeQuarter = q;

  }
  public static String getActiveQuarter(){
    return activeQuarter;
  }


  @Override
  public int hashCode() {
    return Objects.hash(id, name, quarter, instructorFirstName, instructorLastName, instructorEmail);
  }

}
