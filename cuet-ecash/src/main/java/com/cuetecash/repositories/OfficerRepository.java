package com.cuetecash.repositories;

import com.cuetecash.models.Officer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfficerRepository extends JpaRepository<Officer, Long> {
    Officer findByUser_Email(String email);
}