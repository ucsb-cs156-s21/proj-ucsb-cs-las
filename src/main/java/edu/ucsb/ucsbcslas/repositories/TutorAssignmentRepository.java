package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorAssignmentRepository extends CrudRepository<TutorAssignment, Long> {
    public List<TutorAssignment> findbyId(Long id);
    // find the tutors by course id
    // findbyCourses(tutorAssignment.course.id)
}