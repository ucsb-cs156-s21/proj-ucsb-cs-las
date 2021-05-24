package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.entities.RoomSlot;
import edu.ucsb.ucsbcslas.entities.ActiveQuarter;
import java.util.List;
import java.util.Optional;
import java.time.LocalTime;
import java.time.DayOfWeek;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomSlotRepository extends CrudRepository<RoomSlot, Long> {

}
