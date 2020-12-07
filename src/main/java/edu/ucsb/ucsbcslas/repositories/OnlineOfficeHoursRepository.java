package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.entities.OnlineOfficeHours;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnlineOfficeHoursRepository extends CrudRepository<OnlineOfficeHours, Long> {
    //public List<OnlineOfficeHours> findAll();
    public List<OnlineOfficeHours> findbyCourses(Long id);
    //findbyCourses(OnlineOfficeHourse.tutorAssignment.course.id)
}