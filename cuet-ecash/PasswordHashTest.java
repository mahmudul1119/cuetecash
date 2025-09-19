import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashTest {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "password123";
        String hashedPassword = encoder.encode(rawPassword);
        
        System.out.println("Raw password: " + rawPassword);
        System.out.println("BCrypt hash: " + hashedPassword);
        
        // Test if it matches
        boolean matches = encoder.matches(rawPassword, hashedPassword);
        System.out.println("Hash matches: " + matches);
        
        // Test with the hash we're using in database
        String dbHash = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi";
        boolean dbMatches = encoder.matches(rawPassword, dbHash);
        System.out.println("DB hash matches: " + dbMatches);
    }
} 