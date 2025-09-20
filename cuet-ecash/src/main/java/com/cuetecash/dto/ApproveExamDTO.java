package com.cuetecash.dto;

import lombok.Data;

/**
 * Data Transfer Object for approving a student for an exam.
 */
@Data
public class ApproveExamDTO {
    private String studentId;
    private String status;

    // Getters and Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
