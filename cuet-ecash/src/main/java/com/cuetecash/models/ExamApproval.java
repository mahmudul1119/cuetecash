package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "ExamApproval")
@Data
public class ExamApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long approvalID;
    private LocalDate requestDate;
    private LocalDate approvalDate;
    private String status;
    private String approvalType;
    @ManyToOne
    @JoinColumn(name = "OfficerID")
    private Officer officer;
    @ManyToOne
    @JoinColumn(name = "PaymentID")
    private Payment payment;
}
