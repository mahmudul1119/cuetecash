package com.cuetecash.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AllControllers {

    // Root returns a simple health message for API consumers
    @GetMapping("/")
    public ResponseEntity<String> root() {
        return ResponseEntity.ok("CUET eCash API is running");
    }
    
    @GetMapping("/test-login")
    public String testLogin() {
        return "test-login";
    }
}
