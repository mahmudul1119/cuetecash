package com.cuetecash.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class SemesterFeeDTO {
    private Long id;
    private Integer semesterID;
    private Integer batchNO;
    private String department;
    private BigDecimal semesterFee;
    private LocalDate deadline;
    private BigDecimal lateFine;
    private String postedBy;
    private Boolean isActive;

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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public BigDecimal getSemesterFee() {
        return semesterFee;
    }

    public void setSemesterFee(BigDecimal semesterFee) {
        this.semesterFee = semesterFee;
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

    public String getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(String postedBy) {
        this.postedBy = postedBy;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
} 