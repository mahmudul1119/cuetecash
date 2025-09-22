package com.cuetecash.repositories;

import com.cuetecash.models.Officer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OfficerRepository extends JpaRepository<Officer, Long> {
    Officer findByUser_Email(String email);
    
    @Query("SELECT o FROM Officer o WHERE o.user.email = :email")
    Optional<Officer> findByUserEmail(@Param("email") String email);
}