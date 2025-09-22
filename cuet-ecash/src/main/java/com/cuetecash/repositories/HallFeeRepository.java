package com.cuetecash.repositories;

import com.cuetecash.models.HallFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HallFeeRepository extends JpaRepository<HallFee, Long> {
    
    List<HallFee> findAllByIsActiveTrueOrderByDeadlineDesc();
    
    List<HallFee> findByBatchNOAndSemesterIDAndHallIdAndIsActiveTrue(Integer batchNO, Integer semesterID, Long hallId);
    
    @Query("SELECT hf FROM HallFee hf WHERE hf.batchNO = :batchNO AND hf.hallId = :hallId AND hf.isActive = true ORDER BY hf.deadline DESC")
    List<HallFee> findByBatchAndHall(@Param("batchNO") Integer batchNO, @Param("hallId") Long hallId);
    
    @Query("SELECT hf FROM HallFee hf WHERE hf.hallId = :hallId AND hf.isActive = true ORDER BY hf.deadline DESC")
    List<HallFee> findByHallIdAndIsActiveTrue(@Param("hallId") Long hallId);
    
    @Query("SELECT hf FROM HallFee hf WHERE hf.isActive = true ORDER BY hf.createdAt DESC")
    List<HallFee> findActiveHallFeesOrderByDate();
}
