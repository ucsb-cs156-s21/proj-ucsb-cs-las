package edu.ucsb.ucsbcslas.repositories;


import edu.ucsb.ucsbcslas.entities.ActiveQuarter;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveQuarterRepository extends CrudRepository<ActiveQuarter, Long> {
    public List<ActiveQuarter> findAll();
}