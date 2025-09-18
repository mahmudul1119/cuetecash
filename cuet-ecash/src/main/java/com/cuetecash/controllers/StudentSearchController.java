package com.cuetecash.controllers;

import com.cuetecash.dto.PaymentHistoryDTO;
import com.cuetecash.dto.StudentDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.time.LocalDate;
import java.util.Arrays;

@Controller
public class StudentSearchController {

    // Serves the search student page.
    @GetMapping("/searchstudent")
    public String showSearchStudentPage() {
        return "searchstudent.html";
    }

    // Handles API requests for searching a student.
    @GetMapping("/api/search-student")
    @ResponseBody
    public ResponseEntity<StudentDTO> searchStudent(@RequestParam String rollNumber) {
        // Here, you would implement the logic to search for a student in the database.
        System.out.println("Search request received for Roll Number: " + rollNumber);

        // This is mock data for demonstration.
        StudentDTO student = new StudentDTO();
        student.setFullName("John Doe");
        student.setRollNumber(rollNumber);
        student.setDepartment("CSE");
        student.setBatch(22);
        student.setHallName("Fazlul Haque Hall");
        student.setEmail("johndoe@cuet.ac.bd");
        student.setStudentId("12345");

        // Mock payment history
        PaymentHistoryDTO p1 = new PaymentHistoryDTO();
        p1.setTransactionId("TXN12345");
        p1.setTransactionDate(LocalDate.of(2023, 7, 27));
        p1.setDueType("Semester Fee");
        p1.setAmount(9900.00);
        p1.setPaymentMethod("Bkash");
        p1.setStatus("Success");

        PaymentHistoryDTO p2 = new PaymentHistoryDTO();
        p2.setTransactionId("TXN67890");
        p2.setTransactionDate(LocalDate.of(2023, 7, 27));
        p2.setDueType("Late Fine");
        p2.setAmount(700.00);
        p2.setPaymentMethod("Bkash");
        p2.setStatus("Success");

        student.setPaymentHistory(Arrays.asList(p1, p2));

        return ResponseEntity.ok(student);
    }
}

