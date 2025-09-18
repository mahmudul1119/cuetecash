package com.cuetecash.controllers;

import com.cuetecash.dto.PaymentDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DuesController {

    // Serves the view dues page.
    @GetMapping("/viewdues")
    public String showViewDuesPage() {
        return "viewdues.html";
    }

    // Handles the payment API request from viewdues.js
    @PostMapping("/api/payment")
    @ResponseBody
    public ResponseEntity<String> processPayment(@RequestBody PaymentDTO paymentDto) {
        System.out.println("Payment request received:");
        System.out.println("Due Type: " + paymentDto.getDueType());
        System.out.println("Amount: " + paymentDto.getAmount());
        System.out.println("Transaction ID: " + paymentDto.getTransactionId());

        // Here you would save the payment to the database and update the student's dues.
        // For now, we return a success message.
        return ResponseEntity.status(HttpStatus.OK).body("Payment processed successfully.");
    }
}
