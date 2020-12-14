package edu.ucsb.ucsbcslas.repositories;

import java.util.List;

import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnlineOfficeHoursRepository extends CrudRepository<OnlineOfficeHours, Long> {
  List<OnlineOfficeHours> findAll();
  List<OnlineOfficeHours> findByTutorAssignmentId(int id);

}
