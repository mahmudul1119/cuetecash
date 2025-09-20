package com.cuetecash.dto;

import lombok.Data;

/**
 * Data Transfer Object for handling login requests.
 * It encapsulates the data coming from the login form.
 */
@Data
public class LoginDTO {
    private String email;
    private String password;
    private String role;

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
