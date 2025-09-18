package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "Payment")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentID;
    private String transactionID;
    private String paymentMethod;
    private double amount;
    private LocalDate date;
    private String receiptURL;
    @ManyToOne
    @JoinColumn(name = "StudentID")
    private Student student;
    @ManyToOne
    @JoinColumn(name = "SemesterFeeID")
    private SemesterFee semesterFee;
    @ManyToOne
    @JoinColumn(name = "HallFeeID")
    private HallFee hallFee;
}
