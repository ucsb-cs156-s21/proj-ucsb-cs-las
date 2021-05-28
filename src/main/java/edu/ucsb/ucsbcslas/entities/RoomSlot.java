package edu.ucsb.ucsbcslas.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalTime;
import java.time.DayOfWeek;

@Entity
public class RoomSlot {
    // room slot id: property of this entity
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // course data: from course entity (use one to many)
    @NotNull
    @Column(nullable = false)
    private String location;

    // quarter data: from active quarter entity (use one to many)
    @ManyToOne
    @JoinColumns(
        @JoinColumn(name = "id"),
        @JoinColumn(name = "quarter")
    )
    public ActiveQuarter quarter;

    // day of week data: property of this entity
    @Column(nullable = false)
    private DayOfWeek dayOfWeek;

    // start time: property of this entity
    @Column(nullable = false)
    private LocalTime startTime;

    // end time: property of this entity
    @Column(nullable = false)
    private LocalTime endTime;

    public RoomSlot() { }

    // constructor with auto-generated id
    public RoomSlot(String location,
        ActiveQuarter quarter, DayOfWeek dayOfWeek,
        LocalTime startTime, LocalTime endTime) 
    {
        this.location = location;
        this.quarter = quarter;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // constructor with given room slot id
    public RoomSlot(Long id, String location,
                    ActiveQuarter quarter, DayOfWeek dayOfWeek,
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

    public ActiveQuarter getQuarter() {
        return this.quarter;
    }

    public void setQuarter(ActiveQuarter quarter) {
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
        return "{" + " id='" + getId() + "'" 
        + ", location='" + getLocation() + "'" 
        + ", quarter='" + getQuarter() + "'"
        + ", start time='" + getStartTime() + "'" 
        + ", end time='" + getEndTime() + "'" 
        + "}";
    }
}
