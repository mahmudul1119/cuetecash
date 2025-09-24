package com.cuetecash.controllers;

import com.cuetecash.dto.PaymentDTO;
import com.cuetecash.models.Payment;
import com.cuetecash.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class DuesController {
    
    @Autowired
    private PaymentService paymentService;

    // Serves the view dues page.
    @GetMapping("/viewdues")
    public String showViewDuesPage() {
        return "viewdues.html";
    }

    // Handles the payment API request from frontend
    @PostMapping("/api/payment")
    @ResponseBody
    public ResponseEntity<?> processPayment(@RequestBody PaymentDTO paymentDto) {
        try {
            System.out.println("Payment request received:");
            System.out.println("Student ID: " + paymentDto.getStudentId());
            System.out.println("Due Type: " + paymentDto.getDueType());
            System.out.println("Amount: " + paymentDto.getAmount());
            System.out.println("Transaction ID: " + paymentDto.getTransactionId());
            System.out.println("Payment Method: " + paymentDto.getPaymentMethod());
            System.out.println("Fee ID: " + paymentDto.getFeeId());

            // Process and save the payment
            Payment payment = paymentService.processPayment(paymentDto);
            
            return ResponseEntity.ok("Payment processed successfully. Payment ID: " + payment.getPaymentID());
        } catch (Exception e) {
            System.err.println("Error processing payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error processing payment: " + e.getMessage());
        }
    }

    // Get all pending payments for admin approval
    @GetMapping("/api/admin/payments/pending")
    @ResponseBody
    public ResponseEntity<List<Payment>> getPendingPayments() {
        try {
            List<Payment> pendingPayments = paymentService.getAllPendingPayments();
            return ResponseEntity.ok(pendingPayments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Approve a payment
    @PostMapping("/api/admin/payments/{paymentId}/approve")
    @ResponseBody
    public ResponseEntity<?> approvePayment(@PathVariable Long paymentId) {
        try {
            Payment approvedPayment = paymentService.approvePayment(paymentId);
            return ResponseEntity.ok("Payment approved successfully. Payment ID: " + approvedPayment.getPaymentID());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error approving payment: " + e.getMessage());
        }
    }

    // Reject a payment
    @PostMapping("/api/admin/payments/{paymentId}/reject")
    @ResponseBody
    public ResponseEntity<?> rejectPayment(@PathVariable Long paymentId) {
        try {
            Payment rejectedPayment = paymentService.rejectPayment(paymentId);
            return ResponseEntity.ok("Payment rejected successfully. Payment ID: " + rejectedPayment.getPaymentID());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error rejecting payment: " + e.getMessage());
        }
    }
    
    // Get approved payments for a student
    @GetMapping("/api/student/{studentEmail}/approved-payments")
    @ResponseBody
    public ResponseEntity<List<Payment>> getApprovedPayments(@PathVariable String studentEmail) {
        try {
            List<Payment> approvedPayments = paymentService.getApprovedPaymentsByStudentEmail(studentEmail);
            return ResponseEntity.ok(approvedPayments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
