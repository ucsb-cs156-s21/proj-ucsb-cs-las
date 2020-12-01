package edu.ucsb.ucsbcslas.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import edu.ucsb.ucsbcslas.documents.UserLogin;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLoginRepository extends MongoRepository<UserLogin, ObjectId> {
    
}
