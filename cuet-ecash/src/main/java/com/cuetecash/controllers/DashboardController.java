package com.cuetecash.controllers;

import com.cuetecash.models.Student;
import com.cuetecash.repositories.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private final StudentRepository studentRepository;

    public DashboardController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Fetch student profile by email (used after login)
    @GetMapping("/student/profile")
    public ResponseEntity<?> getStudentProfile(@RequestParam("email") String email) {
        Student student = studentRepository.findByUser_Email(email);
        if (student == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }
}
