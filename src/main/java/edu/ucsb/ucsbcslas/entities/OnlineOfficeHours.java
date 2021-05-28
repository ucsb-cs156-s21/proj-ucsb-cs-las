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

@Entity
public class OnlineOfficeHours {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO) //@GeneratedValue(strategy = GenerationType.AUTO) was the original line, change back if broken
  private Long id;
  @ManyToOne
  @JoinColumn(name = "tutor_assignment_id")
  private TutorAssignment tutorAssignment;
  @Column(nullable = false)
  private String dayOfWeek;
  @Column(nullable = false)
  private String startTime;
  @Column(nullable = false)
  private String endTime;
  @Column(nullable = false)
  private String zoomRoomLink;
  @Column(nullable = false)
  private String notes;
  @Column(nullable = false)
  private String tutorName;
  @Column(nullable = false)
  private String courseName;
  @Column(nullable = false)
  private String quarter;

  public OnlineOfficeHours() {
  }

  public OnlineOfficeHours(Long id, TutorAssignment tutorAssignment, String dayOfWeek, String startTime, String endTime,
      String zoomRoomLink, String notes, String tutorName, String courseName, String quarter) {
    this.id = id;
    this.tutorAssignment = tutorAssignment;
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
    this.zoomRoomLink = zoomRoomLink;
    this.notes = notes;
    this.tutorName = tutorName;
    this.courseName = courseName;
    this.quarter = quarter;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public TutorAssignment getTutorAssignment() {
    return this.tutorAssignment;
  }

  public void setTutorAssignment(TutorAssignment tutorAssignment) {
    this.tutorAssignment = tutorAssignment;
  }

  public String getDayOfWeek() {
    return this.dayOfWeek;
  }

  public void setDayOfWeek(String dayOfWeek) {
    this.dayOfWeek = dayOfWeek;
  }

  public String getStartTime() {
    return this.startTime;
  }

  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }

  public String getEndTime() {
    return this.endTime;
  }

  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public String getZoomRoomLink() {
    return this.zoomRoomLink;
  }

  public void setZoomRoomLink(String zoomRoomLink) {
    this.zoomRoomLink = zoomRoomLink;
  }

  public String getNotes() {
    return this.notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
  }

  public String getTutorName() {
    return this.tutorName;
  }

  public void setTutorName(String tutorName) {
    this.tutorName = tutorName;
  }

  public String getCourseName() {
    return this.courseName;
  }

  public void setCourseName(String courseName) {
    this.courseName = courseName;
  }

  public String getQuarter() {
    return this.quarter;
  }

  public void setQuarter(String quarter) {
    this.quarter = quarter;
  }

  @Override
  public boolean equals(Object o) {
    if (o == this)
      return true;
    if (!(o instanceof OnlineOfficeHours)) {
      return false;
    }
    OnlineOfficeHours onlineOfficeHours = (OnlineOfficeHours) o;

    EqualsBuilder builder = new EqualsBuilder();
    builder.append(id, onlineOfficeHours.getId()).append(tutorAssignment, onlineOfficeHours.getTutorAssignment())
        .append(dayOfWeek, onlineOfficeHours.getDayOfWeek()).append(startTime, onlineOfficeHours.getStartTime())
        .append(endTime, onlineOfficeHours.getEndTime()).append(zoomRoomLink, onlineOfficeHours.getZoomRoomLink())
        .append(notes, onlineOfficeHours.getNotes()).append(tutorName, onlineOfficeHours.getTutorName())
        .append(courseName, onlineOfficeHours.getCourseName()).append(quarter, onlineOfficeHours.getQuarter());

    return builder.build();
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, tutorAssignment, dayOfWeek, startTime, endTime, zoomRoomLink, notes);
  }

  @Override
  public String toString() {
    return "{" + " id='" + getId() + "'" + ", tutorAssignment='" + getTutorAssignment() + "'" + ", dayOfWeek='"
        + getDayOfWeek() + "'" + ", startTime='" + getStartTime() + "'" + ", endTime='" + getEndTime() + "'"
        + ", zoomRoomLink='" + getZoomRoomLink() + "'" + ", notes='" + getNotes() + "'" + ", tutorName='" + getTutorName() + "'" + 
        ", courseName='" + getCourseName() + "'" + ", quarter='" + getQuarter() + "'" + "}";
  }

}
