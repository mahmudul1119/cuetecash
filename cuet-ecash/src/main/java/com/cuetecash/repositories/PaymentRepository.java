package com.cuetecash.repositories;

import com.cuetecash.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByPaymentStatus(Payment.PaymentStatus paymentStatus);
    List<Payment> findByStudent_StudentID(Long studentId);
}
