package com.cuetecash.controllers;

import com.cuetecash.dto.ForgetPasswordDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ForgetPasswordController {

    // Serves the forget password page.
    @GetMapping("/forgetpassword")
    public String showForgetPasswordPage() {
        return "forgetpassword.html";
    }

    // Handles the password reset request.
    @PostMapping("/api/reset-password")
    @ResponseBody
    public ResponseEntity<String> resetPassword(@RequestBody ForgetPasswordDTO forgetPasswordDto) {
        // Here, you would implement the logic to send a password reset link to the email.
        System.out.println("Password reset request received for email: " + forgetPasswordDto.getEmail());
        // For a real application, you would generate a token and send it via email.
        return ResponseEntity.ok("Password reset link has been sent to your email.");
    }
}
