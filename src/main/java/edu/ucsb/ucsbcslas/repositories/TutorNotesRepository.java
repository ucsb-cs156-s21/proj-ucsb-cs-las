package edu.ucsb.ucsbcslas.repositories;

import java.util.List;

import edu.ucsb.ucsbcslas.entities.TutorNotes;
import edu.ucsb.ucsbcslas.models.Course;
import edu.ucsb.ucsbcslas.entities.Tutor;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorNotesRepository extends CrudRepository<TutorNotes, Long> {
    List<TutorNotes> findAll();
    List<TutorNotes> findAllByOnlineOfficeHoursId(Long id);
    // List<TutorNotes> findAllByCourse(Course course);
    // List<TutorNotes> findAllByTutor(Tutor tutor);
    // List<TutorNotes> findAllById(Long courseId);

}
