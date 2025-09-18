package com.cuetecash;

import com.cuetecash.models.User;
import com.cuetecash.repositories.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class CuetEcashApplication {
    public static void main(String[] args) {
        SpringApplication.run(CuetEcashApplication.class, args);
    }

    @Bean
    public org.springframework.boot.CommandLineRunner encodeExistingPasswords(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            List<User> users = userRepository.findAll();
            for (User u : users) {
                String pwd = u.getPassword();
                if (pwd != null && !pwd.startsWith("$2a") && !pwd.startsWith("$2b") && !pwd.startsWith("$2y")) {
                    u.setPassword(encoder.encode(pwd));
                }
            }
            userRepository.saveAll(users);
        };
    }
}
