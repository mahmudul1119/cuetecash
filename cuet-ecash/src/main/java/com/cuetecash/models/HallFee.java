package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "hall_fee")
@Data
public class HallFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hall_fee_id")
    private Long hallFeeID;
    
    @Column(name = "semester_id")
    private Integer semesterID;
    
    @Column(name = "batch_no")
    private Integer batchNO;
    
    @Column(name = "hall_id")
    private Long hallId;  // Added this field to match SemesterFee pattern
    
    @Column(name = "h_fee")
    private BigDecimal hFee;
    
    private LocalDate deadline;
    
    @Column(name = "late_fine")
    private BigDecimal lateFine;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToOne
    @JoinColumn(name = "officer_id")  // Changed from hall_id to officer_id to match SemesterFee
    private Officer officer;  // Changed from Hall to Officer to match SemesterFee

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
