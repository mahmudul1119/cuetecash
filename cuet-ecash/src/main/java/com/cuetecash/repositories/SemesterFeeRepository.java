package com.cuetecash.repositories;

import com.cuetecash.models.SemesterFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SemesterFeeRepository extends JpaRepository<SemesterFee, Long> {
}
