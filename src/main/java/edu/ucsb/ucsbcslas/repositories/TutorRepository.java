package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.entities.Tutor;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRepository extends CrudRepository<Tutor, Long> {
  public List<Tutor> findAll();

  public Optional<Tutor> findById(Long id);

  Optional<Tutor> findByEmail(String email);
}
