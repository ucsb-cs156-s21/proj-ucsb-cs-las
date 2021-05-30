package edu.ucsb.ucsbcslas.repositories;

import java.util.List;

import edu.ucsb.ucsbcslas.entities.TutorAssignment;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.entities.Tutor;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorAssignmentRepository extends CrudRepository<TutorAssignment, Long> {
    List<TutorAssignment> findAll();
    List<TutorAssignment> findAllByCourse(Course course);
    List<TutorAssignment> findAllByTutor(Tutor tutor);
    List<TutorAssignment> findAllByCourseId(Long courseId);
}