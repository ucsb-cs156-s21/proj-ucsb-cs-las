package edu.ucsb.ucsbcslas.repositories;

import edu.ucsb.ucsbcslas.documents.Login;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LoginsRepository extends MongoRepository<Login, ObjectId> {
    @Query("{ 'profile.email': ?0}")
    List<Login> findByEmail(String email);
}
