package com.cuetecash.dto;
import lombok.Data;

/**
 * Data Transfer Object for handling payment requests.
 * This object holds information submitted through the payment form.
 */
@Data
public class PaymentDTO {
    private String studentId;
    private String dueType;
    private double amount;
    private String transactionId;
    private String paymentMethod;
}
