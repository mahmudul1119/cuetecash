package com.cuetecash.models;

import jakarta.persistence.*;

@Entity
@Table(name = "officer")
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

    // Getters
    public Long getOfficerID() {
        return officerID;
    }

    public String getFullName() {
        return fullName;
    }

    public String getDesignation() {
        return designation;
    }

    public String getDepartment() {
        return department;
    }

    public Officer getAddedByOfficer() {
        return addedByOfficer;
    }

    public User getUser() {
        return user;
    }

    // Setters
    public void setOfficerID(Long officerID) {
        this.officerID = officerID;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setAddedByOfficer(Officer addedByOfficer) {
        this.addedByOfficer = addedByOfficer;
    }

    public void setUser(User user) {
        this.user = user;
    }
}