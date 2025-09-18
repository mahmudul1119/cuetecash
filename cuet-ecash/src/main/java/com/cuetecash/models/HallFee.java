package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "HallFee")
@Data
public class HallFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hallFeeID;
    private Integer semesterID;
    private Integer batchNO;
    private double hFee;
    private LocalDate deadline;
    private double lateFine;
    @ManyToOne
    @JoinColumn(name = "HallID")
    private Hall hall;
}
