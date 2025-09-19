package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

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
    private double semesterFee;
    private LocalDate deadline;
    @Column(name = "late_fine")
    private double lateFine;
    @ManyToOne
    @JoinColumn(name = "officer_id")
    private Officer officer;
}
