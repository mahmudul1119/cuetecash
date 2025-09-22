package com.cuetecash.controllers;

import com.cuetecash.models.Hall;
import com.cuetecash.repositories.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class HallController {

    @Autowired
    private HallRepository hallRepository;

    // Get all halls
    @GetMapping("/api/halls")
    @ResponseBody
    public ResponseEntity<List<Hall>> getAllHalls() {
        try {
            List<Hall> halls = hallRepository.findAll();
            return ResponseEntity.ok(halls);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get a specific hall by ID
    @GetMapping("/api/halls/{id}")
    @ResponseBody
    public ResponseEntity<Hall> getHallById(@PathVariable Long id) {
        try {
            return hallRepository.findById(id)
                    .map(hall -> ResponseEntity.ok(hall))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
} 