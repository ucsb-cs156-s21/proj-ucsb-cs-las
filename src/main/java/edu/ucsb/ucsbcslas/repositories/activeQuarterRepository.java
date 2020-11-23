package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.entities.ActiveQuarter;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface activeQuarterRepository extends CrudRepository<ActiveQuarter, Long> {
  public List<Admin> findByName(String name);
}