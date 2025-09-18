package com.cuetecash.controllers;


import com.cuetecash.dto.PaymentHistoryDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
public class PaymentHistoryController {

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
}
