package edu.ucsb.changeme.repositories;

import java.util.List;

import edu.ucsb.changeme.models.Course;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {
  List<Course> findAll();
}
