package com.cuetecash.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class HallFeeDTO {
    private Long id;
    private Integer semesterID;
    private Integer batchNO;
    private Long hallId;
    private String hallName;
    private BigDecimal hFee;
    private LocalDate deadline;
    private BigDecimal lateFine;
    private Boolean isActive;
    private String postedBy;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSemesterID() {
        return semesterID;
    }

    public void setSemesterID(Integer semesterID) {
        this.semesterID = semesterID;
    }

    public Integer getBatchNO() {
        return batchNO;
    }

    public void setBatchNO(Integer batchNO) {
        this.batchNO = batchNO;
    }

    public Long getHallId() {
        return hallId;
    }

    public void setHallId(Long hallId) {
        this.hallId = hallId;
    }

    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this.hallName = hallName;
    }

    public BigDecimal getHFee() {
        return hFee;
    }

    public void setHFee(BigDecimal hFee) {
        this.hFee = hFee;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public BigDecimal getLateFine() {
        return lateFine;
    }

    public void setLateFine(BigDecimal lateFine) {
        this.lateFine = lateFine;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }
} 