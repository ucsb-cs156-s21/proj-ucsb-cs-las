package edu.ucsb.ucsbcslas.repositories;

import java.util.List;
import java.util.Optional;

import edu.ucsb.ucsbcslas.models.Course;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {
  List<Course> findAll();
  Course findByNameAndQuarter(String name, String quarter);
  List<Course> findAllByInstructorEmail(String email);
  Optional<Course> findByName(String name);
  Optional<Course> findById(Long id);
  List<Course> findByQuarter(String quarter);
  List<Course> findByNameAndQuarterAndInstructorEmail(String name, String quarter, String email);

  @Query("SELECT DISTINCT quarter FROM Course")
  List<String> selectDistinctQuarter();
}
