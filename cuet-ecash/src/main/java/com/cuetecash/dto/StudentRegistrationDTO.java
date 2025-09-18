package com.cuetecash.dto;

import lombok.Data;

/**
 * Data Transfer Object for handling student registration requests.
 * It encapsulates all the data from the signup form.
 */
@Data
public class StudentRegistrationDTO {
    private String fullName;
    private String rollNumber;
    private String department;
    private int batch;
    private int currentSemester;
    private String mobileNumber;
    private String hallName;
    private String email;
    private String address;
    private String password;
}
