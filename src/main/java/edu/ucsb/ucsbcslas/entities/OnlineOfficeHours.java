package edu.ucsb.ucsbcslas.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.*;

import org.apache.commons.lang3.builder.EqualsBuilder;

@Entity
public class OnlineOfficeHours {
  // online office hours id: property of this entity
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  // tutor assignment data: from tutor assignment (use one to many)
  @OneToMany(mappedBy = "course")
  private List<TutorAssignment> tutorAssignments;

  // room slot data: from room slot entity (use one to many)
  @OneToMany(mappedBy = "")
  private List<RoomSlot> roomSlots;

  // office hour zoom room link: property of this entity
  @Column(nullable = false)
  private String zoomRoomLink;

  // office hour notes: property of this entity
  @Column(nullable = false)
  private String notes;

  public OnlineOfficeHours() { }

  // use auto-generated ID
  public OnlineOfficeHours(TutorAssignment tutorAssignment,
                           RoomSlot roomSlot, String zoomRoomLink, String notes) {
    this.tutorAssignment = tutorAssignment;
    this.roomSlot = roomSlot;
    this.zoomRoomLink = zoomRoomLink;
    this.notes = notes;
  }

  // constructor with given id
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
    return "{ " +
              "id='" + getId() + "', " +
              "tutorAssignment='{ " + getTutorAssignment() + " }', " +
              "roomSlot='{ " + getRoomSlot() + " }', " +
              "zoomRoomLink='" + getZoomRoomLink() + "', " +
              "notes='" + getNotes() +
            "' }";
  }

}
