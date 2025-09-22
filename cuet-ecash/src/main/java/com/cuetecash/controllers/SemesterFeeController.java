package com.cuetecash.controllers;

import com.cuetecash.dto.SemesterFeeDTO;
import com.cuetecash.services.SemesterFeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semester-fees")
@CrossOrigin(origins = "http://localhost:5173")
public class SemesterFeeController {

    @Autowired
    private SemesterFeeService semesterFeeService;

    @GetMapping
    public ResponseEntity<List<SemesterFeeDTO>> getAllSemesterFees() {
        List<SemesterFeeDTO> semesterFees = semesterFeeService.getAllSemesterFees();
        return ResponseEntity.ok(semesterFees);
    }

    @PostMapping
    public ResponseEntity<SemesterFeeDTO> createSemesterFee(@RequestBody SemesterFeeDTO semesterFeeDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        SemesterFeeDTO createdSemesterFee = semesterFeeService.createSemesterFee(semesterFeeDTO, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSemesterFee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SemesterFeeDTO> updateSemesterFee(@PathVariable Long id, @RequestBody SemesterFeeDTO semesterFeeDTO) {
        SemesterFeeDTO updatedSemesterFee = semesterFeeService.updateSemesterFee(id, semesterFeeDTO);
        if (updatedSemesterFee != null) {
            return ResponseEntity.ok(updatedSemesterFee);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSemesterFee(@PathVariable Long id) {
        boolean deleted = semesterFeeService.deleteSemesterFee(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SemesterFeeDTO> getSemesterFeeById(@PathVariable Long id) {
        SemesterFeeDTO semesterFee = semesterFeeService.getSemesterFeeById(id);
        if (semesterFee != null) {
            return ResponseEntity.ok(semesterFee);
        }
        return ResponseEntity.notFound().build();
    }
} 