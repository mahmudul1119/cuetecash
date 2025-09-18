package com.cuetecash.dto;

import lombok.Data;

/**
 * Data Transfer Object for searching student information.
 */
@Data
public class StudentSearchDTO {
    private String rollNumber;
    private String studentId;
}
