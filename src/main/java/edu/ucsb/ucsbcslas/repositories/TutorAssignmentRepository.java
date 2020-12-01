package edu.ucsb.ucsbcslas.repositories;

import java.util.List;

import edu.ucsb.ucsbcslas.entities.TutorAssignment;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorAssignmentRepository extends CrudRepository<TutorAssignment, Long> {
  List<TutorAssignment> findAll();
}
