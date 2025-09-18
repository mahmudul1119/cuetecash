package com.cuetecash.repositories;

import com.cuetecash.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUser_Email(String email);
    Student findByRollNo(String rollNo);
}