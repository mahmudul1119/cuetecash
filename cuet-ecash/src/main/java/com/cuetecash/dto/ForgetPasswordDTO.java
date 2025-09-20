package com.cuetecash.dto;

import lombok.Data;

/**
 * Data Transfer Object for handling a forget password request.
 */
@Data
public class ForgetPasswordDTO {
    private String email;

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
