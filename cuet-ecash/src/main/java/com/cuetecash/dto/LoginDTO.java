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
}
