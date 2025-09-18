package com.cuetecash.dto;

import lombok.Data;

/**
 * Data Transfer Object for handling a forget password request.
 */
@Data
public class ForgetPasswordDTO {
    private String email;
}
