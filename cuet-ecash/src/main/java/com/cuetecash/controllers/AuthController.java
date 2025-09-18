package com.cuetecash.controllers;


import com.cuetecash.dto.LoginDTO;
import com.cuetecash.dto.StudentRegistrationDTO;
import com.cuetecash.models.User;
import com.cuetecash.models.Student;
import com.cuetecash.models.Hall;
import com.cuetecash.repositories.StudentRepository;
import com.cuetecash.repositories.HallRepository;
import com.cuetecash.repositories.UserRepository;
import com.cuetecash.security.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final StudentRepository studentRepository;
    private final HallRepository hallRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserRepository userRepository, PasswordEncoder passwordEncoder, StudentRepository studentRepository, HallRepository hallRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.studentRepository = studentRepository;
        this.hallRepository = hallRepository;
    }

    // Removed static login page endpoint to keep backend API-only

    /**
     * Handles student registration requests.
     * This method is an API endpoint for creating new student accounts.
     *
     * @param registrationDto Data Transfer Object containing registration details.
     * @return A ResponseEntity with the status of the registration.
     */
    @PostMapping("/api/auth/signup")
    @ResponseBody
    @Transactional
    public ResponseEntity<?> registerStudent(@RequestBody StudentRegistrationDTO registrationDto) {
        if (userRepository.findByEmail(registrationDto.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
        }
        User user = new User();
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setRole("STUDENT");
        user = userRepository.save(user);

        Student student = new Student();
        student.setFullName(registrationDto.getFullName());
        student.setDepartment(registrationDto.getDepartment());
        student.setBatch(registrationDto.getBatch());
        student.setAddress(registrationDto.getAddress());
        student.setCurrentSemester(registrationDto.getCurrentSemester());
        student.setMobileNO(registrationDto.getMobileNumber());
        student.setRollNo(registrationDto.getRollNumber());
        if (registrationDto.getHallName() != null && !registrationDto.getHallName().isBlank()) {
            Hall hall = hallRepository.findByHallName(registrationDto.getHallName());
            if (hall == null) {
                hall = hallRepository.findByHallNameIgnoreCase(registrationDto.getHallName());
            }
            if (hall != null) {
                student.setHall(hall);
            }
        }
        student.setUser(user);
        studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
    }

    /**
     * Serves the sign-up page.
     *
     * @return The name of the sign-up view (signuppage.html).
     */
    // Removed static signup page endpoint to keep backend API-only

    @PostMapping("/api/auth/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
            );
            Map<String, Object> extra = new HashMap<>();
            extra.put("role", loginDTO.getRole());
            String token = jwtUtils.generateToken(loginDTO.getEmail(), extra);
            Map<String, Object> body = new HashMap<>();
            body.put("token", token);
            body.put("email", loginDTO.getEmail());
            body.put("role", loginDTO.getRole());
            return ResponseEntity.ok(body);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
