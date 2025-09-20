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


import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

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
    private final StudentRepository studentRepository;
    private final HallRepository hallRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserRepository userRepository, StudentRepository studentRepository, HallRepository hallRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
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
        user.setPassword(registrationDto.getPassword()); // Plain text password
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
        System.out.println("🔐 LOGIN ATTEMPT:");
        System.out.println("   Email: " + loginDTO.getEmail());
        System.out.println("   Password: " + loginDTO.getPassword());
        System.out.println("   Role: " + loginDTO.getRole());
        
        try {
            // Check if user exists first
            User user = userRepository.findByEmail(loginDTO.getEmail());
            if (user == null) {
                System.out.println("❌ User not found in database");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            System.out.println("✅ User found: " + user.getEmail() + " with role: " + user.getRole());
            
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
            );
            System.out.println("✅ Authentication successful");
            
            Map<String, Object> extra = new HashMap<>();
            extra.put("role", user.getRole()); // Use actual user role from database
            String token = jwtUtils.generateToken(loginDTO.getEmail(), extra);
            Map<String, Object> body = new HashMap<>();
            body.put("token", token);
            body.put("email", loginDTO.getEmail());
            body.put("role", user.getRole()); // Use actual user role from database
            System.out.println("✅ Login successful, token generated");
            return ResponseEntity.ok(body);
        } catch (BadCredentialsException ex) {
            System.out.println("❌ Bad credentials: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception ex) {
            System.out.println("❌ Unexpected error: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login error: " + ex.getMessage());
        }
    }
}
