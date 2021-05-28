package edu.ucsb.ucsbcslas.entities;

import java.util.Objects;

import javax.persistence.*;

import org.apache.commons.lang3.builder.EqualsBuilder;

@Entity
public class OnlineOfficeHours {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO) //@GeneratedValue(strategy = GenerationType.AUTO) was the original line, change back if broken
  private Long id;

  @ManyToOne
  @JoinColumn(name = "tutor_assignment_id")
  private TutorAssignment tutorAssignment;

  @ManyToOne
  @JoinColumns(
          @JoinColumn(name = "location"),
          @JoinColumn(name="quarter"),
          @JoinColumn(name="dayOfWeek"),
          @JoinColumn(name="startTime"),
          @JoinColumn(name="endTime")
  )
  private RoomSlot roomSlot;

  // this needs to go
  /*
  @Column(nullable = false)
  private String dayOfWeek;
  @Column(nullable = false)
  private String startTime;
  @Column(nullable = false)
  private String endTime;
  */
  // end needs to go

  @Column(nullable = false)
  private String zoomRoomLink;

  @Column(nullable = false)
  private String notes;

  public OnlineOfficeHours() {

  }

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
    return "{" + " id='" + getId()
            + "', tutorAssignment='" + getTutorAssignment()
            + "', roomSlot='" + getRoomSlot()
            + "', zoomRoomLink='" + getZoomRoomLink()
            + "', notes='" + getNotes() + "' }";
  }

}
