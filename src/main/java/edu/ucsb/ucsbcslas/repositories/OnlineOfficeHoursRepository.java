package edu.ucsb.ucsbcslas.repositories;
import java.util.List;
import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.models.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OnlineOfficeHoursRepository extends CrudRepository<OnlineOfficeHours, Long> {
  List<OnlineOfficeHours> findAll();
  Optional<OnlineOfficeHours> findById(Long id);
  void deleteById(Long id);
  List<OnlineOfficeHours> findAllByTutorAssignment(TutorAssignment tutorAssignment);
  List<OnlineOfficeHours> findByTutorAssignmentId(int id);
}
