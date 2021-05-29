package edu.ucsb.ucsbcslas.entities;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.apache.commons.lang3.builder.EqualsBuilder;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.DayOfWeek;

@Entity
public class RoomSlot {
    // room slot id: generated value, data belongs to this entity
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // location: data belongs to this entity
    @Column(nullable = false)
    private String location;

    // active quarter data: data belongs to this entity
    @Column(nullable = false)
    public String quarter;

    // day of week: data belongs to this entity
    @Column(nullable = false)
    private DayOfWeek dayOfWeek;

    // start time: data belongs to this entity
    @Column(nullable = false)
    private LocalTime startTime;

    // end time: data belongs to this entity
    @Column(nullable = false)
    private LocalTime endTime;

    public RoomSlot() { }

    // constructor with auto-generated id
    public RoomSlot(String location,
                    String quarter, DayOfWeek dayOfWeek,
                    LocalTime startTime, LocalTime endTime) {
        this.location = location;
        this.quarter = quarter;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // constructor with given room slot id
    public RoomSlot(Long id, String location,
        String quarter, DayOfWeek dayOfWeek,
        LocalTime startTime, LocalTime endTime) 
    {
        this.id = id;
        this.location = location;
        this.quarter = quarter;
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

    public String getQuarter() {
        return this.quarter;
    }

    public void setQuarter(String quarter) {
        this.quarter = quarter;
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
               .append(quarter, other.getQuarter())
               .append(dayOfWeek, other.getDayOfWeek())
               .append(startTime, other.getStartTime())
               .append(endTime, other.getEndTime());

        return builder.isEquals();
    }

    @Override
    public String toString() {
        return String.format("{ id='%d', location='%s', quarter='%s', startTime='%s', endTime = '%s' }",
                id,
                getLocation(),
                getQuarter(),
                getStartTime().toString(),
                getEndTime().toString()
        );
    }
}
