package edu.ucsb.changeme.entities;

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
  @GeneratedValue(strategy = GenerationType.AUTO)
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

  public OnlineOfficeHours() {
  }

  public OnlineOfficeHours(Long id, TutorAssignment tutorAssignment, String dayOfWeek, String startTime, String endTime,
      String zoomRoomLink, String notes) {
    this.id = id;
    this.tutorAssignment = tutorAssignment;
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
    this.zoomRoomLink = zoomRoomLink;
    this.notes = notes;
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

  public OnlineOfficeHours id(Long id) {
    this.id = id;
    return this;
  }

  public OnlineOfficeHours tutorAssignment(TutorAssignment tutorAssignment) {
    this.tutorAssignment = tutorAssignment;
    return this;
  }

  public OnlineOfficeHours dayOfWeek(String dayOfWeek) {
    this.dayOfWeek = dayOfWeek;
    return this;
  }

  public OnlineOfficeHours startTime(String startTime) {
    this.startTime = startTime;
    return this;
  }

  public OnlineOfficeHours endTime(String endTime) {
    this.endTime = endTime;
    return this;
  }

  public OnlineOfficeHours zoomRoomLink(String zoomRoomLink) {
    this.zoomRoomLink = zoomRoomLink;
    return this;
  }

  public OnlineOfficeHours notes(String notes) {
    this.notes = notes;
    return this;
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
        .append(notes, onlineOfficeHours.getNotes());

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
        + ", zoomRoomLink='" + getZoomRoomLink() + "'" + ", notes='" + getNotes() + "'" + "}";
  }

}
