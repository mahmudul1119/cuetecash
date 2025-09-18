@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            if (user != null && user.getRole().equals("Admin")) {
                return ResponseEntity.ok(new LoginResponse(true, user.getRole(), "/admindashboard.html"));
            }
            return ResponseEntity.status(401).body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Login failed");
        }
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok && data.role === 'Admin') {
            localStorage.setItem('userRole', 'Admin');
            window.location.href = 'admindashboard.html';
        } else {
            alert('Invalid credentials or not authorized');
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
    }
}

spring.mvc.static-path-pattern=/**
spring.web.resources.static-locations=classpath:/static/
spring.security.csrf.enabled=false

USE ecash_db;
SELECT * FROM Officers;

