package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "student")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentID;
    @Column(name = "full_name")
    private String fullName;
    private String department;
    private int batch;
    private String address;
    @Column(name = "current_semester")
    private int currentSemester;
    @Column(name = "mobile_no")
    private String mobileNO;
    @Column(name = "roll_no")
    private String rollNo;
    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
