package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.entities.Admin;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Long> {
  public List<Admin> findByEmail(String email);
}
