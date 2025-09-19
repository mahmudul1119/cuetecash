package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

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
    @Column(name = "h_fee")
    private double hFee;
    private LocalDate deadline;
    @Column(name = "late_fine")
    private double lateFine;
    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;
}
