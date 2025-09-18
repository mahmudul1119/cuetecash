package com.cuetecash.dto;

import lombok.Data;
import java.time.LocalDate;

/**
 * Data Transfer Object for displaying payment history.
 * This class represents a single entry in the payment history table.
 */
@Data
public class PaymentHistoryDTO {
    private String transactionId;
    private LocalDate transactionDate;
    private String dueType;
    private double amount;
    private String paymentMethod;
    private String status;
}
