package com.cuetecash.repositories;

import com.cuetecash.models.ExamApproval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamApprovalRepository extends JpaRepository<ExamApproval, Long> {
}
