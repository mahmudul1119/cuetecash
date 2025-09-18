package com.cuetecash.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class AdminDashboardController {

    // Serves the admin dashboard page.
    @GetMapping("/admindashboard")
    public String showAdminDashboard() {
        return "admindashboard.html";
    }
}

