package com.cuetecash.dto;

import lombok.Data;

import java.util.List;

/**
 * Data Transfer Object for displaying student details and related information.
 */
@Data
public class StudentDTO {
    private String fullName;
    private String rollNumber;
    private String department;
    private int batch;
    private String hallName;
    private String email;
    private String studentId;
    private List<PaymentHistoryDTO> paymentHistory;

    // Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getBatch() {
        return batch;
    }

    public void setBatch(int batch) {
        this.batch = batch;
    }

    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this.hallName = hallName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public List<PaymentHistoryDTO> getPaymentHistory() {
        return paymentHistory;
    }

    public void setPaymentHistory(List<PaymentHistoryDTO> paymentHistory) {
        this.paymentHistory = paymentHistory;
    }
}
