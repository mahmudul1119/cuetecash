package com.cuetecash.controllers;

import com.cuetecash.dto.NoticeDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
public class NoticeController {

    // Serves the notice page.
    @GetMapping("/noticepage")
    public String showNoticePage() {
        return "noticepage.html";
    }

    // Provides mock notice data for the frontend.
    @GetMapping("/api/notices")
    @ResponseBody
    public List<NoticeDTO> getNotices() {
        List<NoticeDTO> notices = new ArrayList<>();
        
        // Mock data to simulate notices.
        NoticeDTO n1 = new NoticeDTO();
        n1.setTitle("Examination Fee Deadline Extended");
        n1.setContent("The deadline for submitting the examination fee has been extended to August 30, 2025. All students are requested to complete the payment by the new deadline.");
        n1.setPublishDate(LocalDate.of(2025, 7, 15));
        notices.add(n1);

        NoticeDTO n2 = new NoticeDTO();
        n2.setTitle("Academic Seminar on AI");
        n2.setContent("A seminar on 'The Future of AI in Engineering' will be held on August 20, 2025, at the university auditorium. All students are invited to attend.");
        n2.setPublishDate(LocalDate.of(2025, 7, 10));
        notices.add(n2);
        
        return notices;
    }
}