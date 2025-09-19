package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "hall")
@Data
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hall_id")
    private Long hallID;
    @Column(name = "hall_name")
    private String hallName;
    private Integer capacity;
    @OneToOne
    @JoinColumn(name = "officer_id")
    private Officer officer;
    @OneToMany(mappedBy = "hall")
    private List<Student> students;
}
