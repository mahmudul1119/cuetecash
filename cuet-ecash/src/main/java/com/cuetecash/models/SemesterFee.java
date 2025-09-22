package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "semester_fee")
@Data
public class SemesterFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "semester_fee_id")
    private Long semesterFeeID;
    
    @Column(name = "semester_id")
    private Integer semesterID;
    
    @Column(name = "batch_no")
    private Integer batchNO;
    
    private String department;
    
    @Column(name = "semester_fee")
    private BigDecimal semesterFee;
    
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
    @JoinColumn(name = "officer_id")
    private Officer officer;

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
