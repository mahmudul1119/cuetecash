package com.cuetecash.controllers;

import com.cuetecash.dto.HallFeeDTO;
import com.cuetecash.services.HallFeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/hall-fees")
@CrossOrigin(origins = "http://localhost:5173")
public class HallFeeController {

    @Autowired
    private HallFeeService hallFeeService;

    @GetMapping
    public ResponseEntity<List<HallFeeDTO>> getAllHallFees() {
        List<HallFeeDTO> hallFees = hallFeeService.getAllHallFees();
        return ResponseEntity.ok(hallFees);
    }

    @PostMapping
    public ResponseEntity<HallFeeDTO> createHallFee(@RequestBody HallFeeDTO hallFeeDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        HallFeeDTO createdHallFee = hallFeeService.createHallFee(hallFeeDTO, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHallFee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HallFeeDTO> updateHallFee(@PathVariable Long id, @RequestBody HallFeeDTO hallFeeDTO) {
        HallFeeDTO updatedHallFee = hallFeeService.updateHallFee(id, hallFeeDTO);
        if (updatedHallFee != null) {
            return ResponseEntity.ok(updatedHallFee);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHallFee(@PathVariable Long id) {
        boolean deleted = hallFeeService.deleteHallFee(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HallFeeDTO> getHallFeeById(@PathVariable Long id) {
        HallFeeDTO hallFee = hallFeeService.getHallFeeById(id);
        if (hallFee != null) {
            return ResponseEntity.ok(hallFee);
        }
        return ResponseEntity.notFound().build();
    }
} 