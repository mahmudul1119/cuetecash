package com.cuetecash.controllers;

import com.cuetecash.dto.ApproveExamDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ApproveExamController {

    // Serves the approve exam page.
    @GetMapping("/approveexam")
    public String showApproveExamPage() {
        return "approveexam.html";
    }

    // Handles the request to approve a student for an exam.
    @PostMapping("/api/approve-exam")
    @ResponseBody
    public ResponseEntity<String> approveExam(@RequestBody ApproveExamDTO approveExamDto) {
        // Here, you would implement the logic to update the student's status in the database.
        System.out.println("Approval request received:");
        System.out.println("Student ID: " + approveExamDto.getStudentId());
        System.out.println("Status: " + approveExamDto.getStatus());
        return ResponseEntity.ok("Student approval status updated successfully.");
    }
}
