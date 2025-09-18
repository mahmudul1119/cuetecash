package com.cuetecash.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import java.io.IOException;
import java.util.Collection;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // Get the roles of the authenticated user
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String redirectUrl = "/";
        
        // Redirect to a specific dashboard based on the user's role
        for (GrantedAuthority authority : authorities) {
            if (authority.getAuthority().equals("ROLE_ADMIN")) {
                redirectUrl = "/admindashboard";
                break;
            } else if (authority.getAuthority().equals("ROLE_OFFICER")) {
                redirectUrl = "/hallofficerdashboard";
                break;
            } else if (authority.getAuthority().equals("ROLE_STUDENT")) {
                redirectUrl = "/studentdashboard";
                break;
            }
        }
        
        response.sendRedirect(request.getContextPath() + redirectUrl);
    }
}

