package com.cuetecash.controllers;

import com.cuetecash.dto.PaymentHistoryDTO;
import com.cuetecash.models.Payment;
import com.cuetecash.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
public class PaymentHistoryController {

    @Autowired
    private PaymentService paymentService;

    // Serves the payment history page.
    @GetMapping("/paymenthistory")
    public String showPaymentHistoryPage() {
        return "paymenthistory.html";
    }

    // Provides mock payment history data for the frontend.
    @GetMapping("/api/payment-history")
    @ResponseBody
    public List<PaymentHistoryDTO> getPaymentHistory() {
        List<PaymentHistoryDTO> history = new ArrayList<>();
        
        // Mock data to simulate database records.
        PaymentHistoryDTO p1 = new PaymentHistoryDTO();
        p1.setTransactionId("TXN12345");
        p1.setTransactionDate(LocalDate.of(2023, 7, 27));
        p1.setDueType("Semester Fee");
        p1.setAmount(9900.00);
        p1.setPaymentMethod("Bkash");
        p1.setStatus("Success");
        history.add(p1);

        PaymentHistoryDTO p2 = new PaymentHistoryDTO();
        p2.setTransactionId("TXN67890");
        p2.setTransactionDate(LocalDate.of(2023, 7, 27));
        p2.setDueType("Late Fine");
        p2.setAmount(700.00);
        p2.setPaymentMethod("Bkash");
        p2.setStatus("Success");
        history.add(p2);

        return history;
    }

    // Get payment history for a specific student
    @GetMapping("/api/student/payment-history")
    @ResponseBody
    public ResponseEntity<List<PaymentHistoryDTO>> getStudentPaymentHistory(@RequestParam String email) {
        try {
            List<Payment> approvedPayments = paymentService.getApprovedPaymentsByStudentEmail(email);
            List<PaymentHistoryDTO> history = new ArrayList<>();
            
            for (Payment payment : approvedPayments) {
                PaymentHistoryDTO dto = new PaymentHistoryDTO();
                dto.setTransactionId(payment.getTransactionID());
                dto.setTransactionDate(payment.getDate());
                dto.setAmount(payment.getAmount());
                dto.setPaymentMethod(payment.getPaymentMethod());
                dto.setStatus("Success"); // Approved payments are successful
                
                // Determine due type
                if (payment.getSemesterFee() != null) {
                    dto.setDueType("Semester Fee");
                } else if (payment.getHallFee() != null) {
                    dto.setDueType("Hall Fee");
                } else {
                    dto.setDueType("Fee Payment");
                }
                
                history.add(dto);
            }
            
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
