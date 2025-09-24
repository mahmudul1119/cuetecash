package com.cuetecash.services;

import com.cuetecash.dto.PaymentDTO;
import com.cuetecash.models.Payment;
import com.cuetecash.models.Student;
import com.cuetecash.models.SemesterFee;
import com.cuetecash.models.HallFee;
import com.cuetecash.repositories.PaymentRepository;
import com.cuetecash.repositories.StudentRepository;
import com.cuetecash.repositories.SemesterFeeRepository;
import com.cuetecash.repositories.HallFeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private SemesterFeeRepository semesterFeeRepository;
    
    @Autowired
    private HallFeeRepository hallFeeRepository;

    public Payment processPayment(PaymentDTO paymentDTO) {
        try {
            // Find the student by email (studentId is actually email from frontend)
            Student student = studentRepository.findByUser_Email(paymentDTO.getStudentId());
            if (student == null) {
                throw new RuntimeException("Student not found with email: " + paymentDTO.getStudentId());
            }

            // Create and save the payment record
            Payment payment = new Payment();
            payment.setStudent(student);
            payment.setAmount(paymentDTO.getAmount());
            payment.setPaymentMethod(paymentDTO.getPaymentMethod());
            payment.setTransactionID(paymentDTO.getTransactionId());
            payment.setDate(LocalDateTime.now().toLocalDate());
            payment.setPaymentStatus(Payment.PaymentStatus.PENDING); // Initial status
            payment.setCreatedAt(LocalDateTime.now());
            payment.setUpdatedAt(LocalDateTime.now());
            
            // Link to specific fee based on feeId and type
            if (paymentDTO.getFeeId() != null && !paymentDTO.getFeeId().isEmpty()) {
                Long feeId = Long.parseLong(paymentDTO.getFeeId());
                if ("semester".equalsIgnoreCase(paymentDTO.getDueType())) {
                    SemesterFee semesterFee = semesterFeeRepository.findById(feeId)
                            .orElseThrow(() -> new RuntimeException("Semester fee not found"));
                    payment.setSemesterFee(semesterFee);
                } else if ("hall".equalsIgnoreCase(paymentDTO.getDueType())) {
                    HallFee hallFee = hallFeeRepository.findById(feeId)
                            .orElseThrow(() -> new RuntimeException("Hall fee not found"));
                    payment.setHallFee(hallFee);
                }
            }

            return paymentRepository.save(payment);

        } catch (Exception e) {
            throw new RuntimeException("Failed to process payment: " + e.getMessage());
        }
    }

    public Payment updatePaymentStatus(Long paymentId, Payment.PaymentStatus status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        payment.setPaymentStatus(status);
        payment.setUpdatedAt(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPendingPayments() {
        return paymentRepository.findByPaymentStatus(Payment.PaymentStatus.PENDING);
    }
    
    public List<Payment> getPaymentsByStudent(Long studentId) {
        return paymentRepository.findByStudent_StudentID(studentId);
    }
    
    public Payment approvePayment(Long paymentId) {
        return updatePaymentStatus(paymentId, Payment.PaymentStatus.APPROVED);
    }
    
    public Payment rejectPayment(Long paymentId) {
        return updatePaymentStatus(paymentId, Payment.PaymentStatus.FAILED);
    }
    
    public List<Payment> getApprovedPaymentsByStudentEmail(String studentEmail) {
        Student student = studentRepository.findByUser_Email(studentEmail);
        if (student == null) {
            throw new RuntimeException("Student not found with email: " + studentEmail);
        }
        
        List<Payment> allStudentPayments = paymentRepository.findByStudent_StudentID(student.getStudentID());
        return allStudentPayments.stream()
                .filter(payment -> payment.getPaymentStatus() == Payment.PaymentStatus.APPROVED)
                .collect(java.util.stream.Collectors.toList());
    }
}