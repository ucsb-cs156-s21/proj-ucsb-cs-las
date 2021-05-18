package edu.ucsb.ucsbcslas.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.apache.commons.lang3.builder.EqualsBuilder;
import java.util.Objects;

@Entity
public class RoomSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String location;
    @Column(nullable = false)
    private ActiveQuarter activeQuarter;
    @Column(nullable = false)
    private Time.DayOfWeek dayOfWeek;
    @Column(nullable = false)
    private Time.LocalTime startTime;
    @Column(nullable = false)
    private Time.LocalTime endTime;

    public RoomSlot() {
     }

    public RoomSlot(Long id, String activeQuarter) {
        this.id = id;
        this.activeQuarter = activeQuarter;
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

    public void setActiveQuarter(ActiveQuarter activeQuarter) {
        this.activeQuarter = activeQuarter;
    }

    public String getDayOfWeek() {
        return this.dayOfWeek;
    }

    public void setDayOfWeek(Time.DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Time.LocalTime getStartTime() {
        return this.startTime;
    }

    public void setStartTime(Time.LocalTime startTime) {
        this.startTime = startTime;
    }

    public Time.LocalTime getEndTime() {
        return this.endTime;
    }

    public void setEndTime(Time.LocalTime EndTime) {
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
               .append(location, other.getLocation(activeQuarter, other.getActiveQuarter())
               .append(activeQuarter, other.getActiveQuarter())
               .append(dayOfWeek, other.getDayOfWeek())
               .append(startTime, other.getStartTime()
               .append(endTime, other.getEndTime()));

        return builder.isEquals();
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" 
        + ", activeQuarter='" + getLocation() + "'" 
        + ", activeQuarter='" + getActiveQuarter() + "'" 
        + ", activeQuarter='" + getStartTime() + "'" 
        + ", activeQuarter='" + getEndTime() + "'" 
        + "}";
    }
}
