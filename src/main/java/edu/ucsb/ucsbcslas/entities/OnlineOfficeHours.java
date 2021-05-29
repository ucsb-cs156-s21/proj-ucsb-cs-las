package edu.ucsb.ucsbcslas.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.apache.commons.lang3.builder.EqualsBuilder;

@Entity
public class OnlineOfficeHours {
  // online office hours id: generated value, data belongs to this entity
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  // tutor assignment: data belongs to tutor assignment entity
  @ManyToOne
  @JoinColumn(nullable = false, name = "tutor_assignment_id")
  private TutorAssignment tutorAssignment;

  // room slot: data belongs to room slot entity
  @ManyToOne
  @JoinColumn(nullable = false, name = "room_slot_id")
  private RoomSlot roomSlot;

  // office hour zoom room link: data belongs to this entity
  @Column(nullable = false)
  private String zoomRoomLink;

  // office hour notes: data belongs to this entity
  @Column(nullable = false)
  private String notes;

  public OnlineOfficeHours() { }

  // constructor using auto-generated ID
  public OnlineOfficeHours(TutorAssignment tutorAssignment,
                           RoomSlot roomSlot, String zoomRoomLink, String notes) {
    this.tutorAssignment = tutorAssignment;
    this.roomSlot = roomSlot;
    this.zoomRoomLink = zoomRoomLink;
    this.notes = notes;
  }

  // constructor with a given id
  // (tests use this, since I think it simplifies things
  // having consistent known ID, vs generated?)
  public OnlineOfficeHours(Long id, TutorAssignment tutorAssignment,
                           RoomSlot roomSlot, String zoomRoomLink, String notes) {
    this.id = id;
    this.tutorAssignment = tutorAssignment;
    this.roomSlot = roomSlot;
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

  public RoomSlot getRoomSlot() {
    return this.roomSlot;
  }

  public void setRoomSlot(RoomSlot roomSlot) {
    this.roomSlot = roomSlot;
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
        .append(roomSlot, onlineOfficeHours.getRoomSlot()).append(zoomRoomLink, onlineOfficeHours.getZoomRoomLink())
        .append(notes, onlineOfficeHours.getNotes());

    return builder.build();
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, tutorAssignment, roomSlot, zoomRoomLink, notes);
  }

  @Override
  public String toString() {
    return String.format("{ id='%d', tutorAssignment='{ %s }', roomSlot='{ %s }', zoomRoomLink='%s', notes='%s' }",
            id, getTutorAssignment(), getRoomSlot(), getZoomRoomLink(), getNotes());
  }

}
