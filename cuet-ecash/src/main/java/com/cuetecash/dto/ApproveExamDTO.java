package com.cuetecash.dto;

import lombok.Data;

/**
 * Data Transfer Object for approving a student for an exam.
 */
@Data
public class ApproveExamDTO {
    private String studentId;
    private String status;
}
