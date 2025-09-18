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
}
