package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "Hall")
@Data
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hallID;
    private String hallName;
    private Integer capacity;
    @OneToOne
    @JoinColumn(name = "OfficerID")
    private Officer officer;
    @OneToMany(mappedBy = "hall")
    private List<Student> students;
}
