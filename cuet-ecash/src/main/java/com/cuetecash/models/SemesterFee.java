package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "SemesterFee")
@Data
public class SemesterFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long semesterFeeID;
    private Integer semesterID;
    private Integer batchNO;
    private String department;
    private double semesterFee;
    private LocalDate deadline;
    private double lateFine;
    @ManyToOne
    @JoinColumn(name = "OfficerID")
    private Officer officer;
}
