package com.cuetecash.repositories;

import com.cuetecash.models.SemesterFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SemesterFeeRepository extends JpaRepository<SemesterFee, Long> {
    
    List<SemesterFee> findAllByIsActiveTrueOrderByDeadlineDesc();
    
    List<SemesterFee> findByBatchNOAndSemesterIDAndDepartmentAndIsActiveTrue(Integer batchNO, Integer semesterID, String department);
    
    @Query("SELECT sf FROM SemesterFee sf WHERE sf.batchNO = :batchNO AND sf.department = :department AND sf.isActive = true ORDER BY sf.deadline DESC")
    List<SemesterFee> findByBatchAndDepartment(@Param("batchNO") Integer batchNO, @Param("department") String department);
    
    @Query("SELECT sf FROM SemesterFee sf WHERE sf.department = :department AND sf.isActive = true ORDER BY sf.deadline DESC")
    List<SemesterFee> findByDepartmentAndIsActiveTrue(@Param("department") String department);
    
    @Query("SELECT sf FROM SemesterFee sf WHERE sf.isActive = true ORDER BY sf.createdAt DESC")
    List<SemesterFee> findActiveSemesterFeesOrderByDate();
}
