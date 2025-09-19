package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentID;
    @Column(name = "transaction_id")
    private String transactionID;
    @Column(name = "payment_method")
    private String paymentMethod;
    private double amount;
    private LocalDate date;
    @Column(name = "receipt_url")
    private String receiptURL;
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus = PaymentStatus.COMPLETED;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
    @ManyToOne
    @JoinColumn(name = "semester_fee_id")
    private SemesterFee semesterFee;
    @ManyToOne
    @JoinColumn(name = "hall_fee_id")
    private HallFee hallFee;
    
    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }
}
