package com.cuetecash.services;

import com.cuetecash.dto.UserDTO;
import com.cuetecash.models.User;
import com.cuetecash.models.Student;
import com.cuetecash.models.Officer;
import com.cuetecash.repositories.UserRepository;
import com.cuetecash.repositories.StudentRepository;
import com.cuetecash.repositories.OfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private OfficerRepository officerRepository;

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return user != null ? convertToDTO(user) : null;
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user != null ? convertToDTO(user) : null;
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserID(user.getUserID());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        
        // Fetch the full name based on the user's role
        String fullName = "Unknown User";
        try {
            if ("Student".equalsIgnoreCase(user.getRole())) {
                Student student = studentRepository.findByUser_Email(user.getEmail());
                if (student != null) {
                    fullName = student.getFullName();
                }
            } else if ("Hall Officer".equalsIgnoreCase(user.getRole()) || 
                      "Dept. Officer".equalsIgnoreCase(user.getRole()) || 
                      "Admin".equalsIgnoreCase(user.getRole())) {
                Officer officer = officerRepository.findByUser_Email(user.getEmail());
                if (officer != null) {
                    fullName = officer.getFullName();
                }
            }
        } catch (Exception e) {
            // If there's an error fetching the name, use the email as fallback
            fullName = user.getEmail();
        }
        
        dto.setFullName(fullName);
        return dto;
    }
}