package com.cuetecash.repositories;

import com.cuetecash.models.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    
    List<Notice> findAllByIsActiveTrueOrderByPostedAtDesc();
    
    List<Notice> findByNoticeTypeAndIsActiveTrueOrderByPostedAtDesc(String noticeType);
    
    @Query("SELECT n FROM Notice n WHERE n.isActive = true ORDER BY n.postedAt DESC")
    List<Notice> findActiveNoticesOrderByDate();
    
    @Query("SELECT n FROM Notice n WHERE n.officer.officerID = :officerId AND n.isActive = true ORDER BY n.postedAt DESC")
    List<Notice> findActiveNoticesByOfficer(@Param("officerId") Long officerId);
}