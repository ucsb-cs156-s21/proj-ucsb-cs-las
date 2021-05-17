package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.entities.RoomSlot;
import edu.ucsb.ucsbcslas.entities.ActiveQuarter;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomSlotRepository extends CrudRepository<RoomSlot, Long> {
    List<RoomSlot> findAll();
    List<RoomSlot> findByLocation(String location);
    List<RoomSlot> findByYearAndQuarter(ActiveQuarter activeQuarter);
    List<RoomSlot> findByDayOfWeek(Time.DayOfWeek dayOfWeek);
    List<RoomSlot> findByStartTime(LocalTime startTime);
    List<RoomSlot> findByEndTime(LocalTime endTime);
}