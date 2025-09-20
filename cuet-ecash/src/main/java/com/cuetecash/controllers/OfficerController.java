package com.cuetecash.controllers;

import com.cuetecash.models.Officer;
import com.cuetecash.repositories.OfficerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/officer")
public class OfficerController {

    private final OfficerRepository officerRepository;

    public OfficerController(OfficerRepository officerRepository) {
        this.officerRepository = officerRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getOfficerProfile(@RequestParam String email) {
        try {
            System.out.println("🔍 Looking for officer with email: " + email);
            
            Officer officer = officerRepository.findByUser_Email(email);
            
            if (officer == null) {
                System.out.println("❌ Officer not found for email: " + email);
                return ResponseEntity.notFound().build();
            }
            
            System.out.println("✅ Officer found: " + officer.getFullName());
            return ResponseEntity.ok(officer);
        } catch (Exception e) {
            System.out.println("🚨 Error getting officer profile: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error retrieving officer profile");
        }
    }
}