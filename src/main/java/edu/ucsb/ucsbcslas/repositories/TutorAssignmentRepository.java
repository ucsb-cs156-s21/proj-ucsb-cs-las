package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.entities.Tutor;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorAssignmentRepository extends CrudRepository<TutorAssignment, Long> {
  public List<TutorAssignment> findByCourse(String course);
}
