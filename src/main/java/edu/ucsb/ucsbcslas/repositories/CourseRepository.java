package edu.ucsb.ucsbcslas.repositories;

import java.util.List;
import java.util.Optional;

import edu.ucsb.ucsbcslas.models.Course;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {
  List<Course> findAll();
  Course findByNumberAndQuarter(String number, String quarter);
  List<Course> findAllByInstructorEmail(String email);
  Optional<Course> findByNumber(String number);
  Optional<Course> findById(Long id);
  List<Course> findByQuarter(String quarter);
}
