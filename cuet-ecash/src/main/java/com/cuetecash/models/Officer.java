package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "officer")
@Data
public class Officer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "officer_id")
    private Long officerID;
    @Column(name = "full_name")
    private String fullName;
    private String designation;
    private String department;
    @ManyToOne
    @JoinColumn(name = "added_by_officer_id")
    private Officer addedByOfficer;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}