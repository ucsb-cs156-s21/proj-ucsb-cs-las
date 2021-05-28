package edu.ucsb.ucsbcslas.entities;

import javax.persistence.*;

import org.apache.commons.lang3.builder.EqualsBuilder;

import java.time.LocalTime;
import java.time.DayOfWeek;

@Entity
public class RoomSlot {
    // room slot id: generated value, data belongs to this entity
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // location: data belongs to this entity
    @JoinColumn(nullable = false)
    private String location;

    // active quarter data: data belongs to quarter entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activeQuarter_id")
    private ActiveQuarter activeQuarter;

    // day of week: data belongs to this entity
    @JoinColumn(nullable = false)
    private DayOfWeek dayOfWeek;

    // start time: data belongs to this entity
    @JoinColumn(nullable = false)
    private LocalTime startTime;

    // end time: data belongs to this entity
    @JoinColumn(nullable = false)
    private LocalTime endTime;

    public RoomSlot() { }

    // constructor with auto-generated id
    public RoomSlot(String location,
                    ActiveQuarter activeQuarter, DayOfWeek dayOfWeek,
                    LocalTime startTime, LocalTime endTime) {
        this.location = location;
        this.activeQuarter = activeQuarter;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // constructor with given room slot id
    public RoomSlot(Long id, String location,
                    ActiveQuarter activeQuarter, DayOfWeek dayOfWeek,
                    LocalTime startTime, LocalTime endTime) {
        this.id = id;
        this.location = location;
        this.activeQuarter = activeQuarter;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public ActiveQuarter getActiveQuarter() {
        return this.activeQuarter;
    }

    public void setActiveQuarter(ActiveQuarter quarter) {
        this.activeQuarter = quarter;
    }

    public DayOfWeek getDayOfWeek() {
        return this.dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return this.startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return this.endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;

        if (!(o instanceof RoomSlot))
            return false;
        
        RoomSlot other = (RoomSlot) o;
        EqualsBuilder builder = new EqualsBuilder();
        builder.append(id, other.getId())
               .append(location, other.getLocation())
               .append(activeQuarter, other.getActiveQuarter())
               .append(dayOfWeek, other.getDayOfWeek())
               .append(startTime, other.getStartTime())
               .append(endTime, other.getEndTime());

        return builder.isEquals();
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" 
        + ", location='" + getLocation() + "'" 
        + ", quarter='" + getActiveQuarter() + "'"
        + ", start time='" + getStartTime() + "'" 
        + ", end time='" + getEndTime() + "'" 
        + "}";
    }
}
