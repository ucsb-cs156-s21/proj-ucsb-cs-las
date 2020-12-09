package edu.ucsb.ucsbcslas.repositories;

import java.util.List;
import java.util.Optional;

import edu.ucsb.ucsbcslas.entities.Tutor;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRepository extends CrudRepository<Tutor, Long> {
  List<Tutor> findAll();
  Optional<Tutor> findByEmail(String email);
  Optional<Tutor> findById(Long id);
}