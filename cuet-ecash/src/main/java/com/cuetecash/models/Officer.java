package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Officer")
@Data
public class Officer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long officerID;
    private String fullName;
    private String designation;
    private String department;
    @ManyToOne
    @JoinColumn(name = "AddedByOfficerID")
    private Officer addedByOfficer;
    @OneToOne
    @JoinColumn(name = "UserID")
    private User user;
}