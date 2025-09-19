package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_approval")
@Data
public class ExamApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "approval_id")
    private Long approvalID;
    @Column(name = "request_date")
    private LocalDate requestDate;
    @Column(name = "approval_date")
    private LocalDate approvalDate;
    @Enumerated(EnumType.STRING)
    private ApprovalStatus status = ApprovalStatus.PENDING;
    @Column(name = "approval_type")
    private String approvalType;
    private String comments;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @ManyToOne
    @JoinColumn(name = "officer_id")
    private Officer officer;
    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;
    
    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED
    }
}
