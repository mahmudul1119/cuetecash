package com.cuetecash.repositories;

import com.cuetecash.models.HallFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallFeeRepository extends JpaRepository<HallFee, Long> {
}
