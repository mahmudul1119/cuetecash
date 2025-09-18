package com.cuetecash.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HallOfficerDashboardController {

    // Serves the hall officer dashboard page.
    @GetMapping("/hallofficerdashboard")
    public String showHallOfficerDashboard() {
        return "hallofficerdashboard.html";
    }
}
