package com.cuetecash.repositories;

import com.cuetecash.models.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallRepository extends JpaRepository<Hall, Long> {
    Hall findByHallName(String hallName);
    Hall findByHallNameIgnoreCase(String hallName);
}
