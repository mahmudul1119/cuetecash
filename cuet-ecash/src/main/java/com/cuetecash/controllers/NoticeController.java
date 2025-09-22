package com.cuetecash.controllers;

import com.cuetecash.dto.NoticeDTO;
import com.cuetecash.services.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    // Serves the notice page.
    @GetMapping("/noticepage")
    public String showNoticePage() {
        return "noticepage.html";
    }

    // Get all active notices
    @GetMapping("/api/notices")
    @ResponseBody
    public ResponseEntity<List<NoticeDTO>> getNotices() {
        try {
            List<NoticeDTO> notices = noticeService.getAllNotices();
            return ResponseEntity.ok(notices);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get notices by type
    @GetMapping("/api/notices/type/{noticeType}")
    @ResponseBody
    public ResponseEntity<List<NoticeDTO>> getNoticesByType(@PathVariable String noticeType) {
        try {
            List<NoticeDTO> notices = noticeService.getNoticesByType(noticeType);
            return ResponseEntity.ok(notices);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Create a new notice
    @PostMapping("/api/notices")
    @ResponseBody
    public ResponseEntity<NoticeDTO> createNotice(@RequestBody NoticeDTO noticeDTO) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserEmail = authentication.getName();
            
            NoticeDTO createdNotice = noticeService.createNotice(noticeDTO, currentUserEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdNotice);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update an existing notice
    @PutMapping("/api/notices/{id}")
    @ResponseBody
    public ResponseEntity<NoticeDTO> updateNotice(@PathVariable Long id, @RequestBody NoticeDTO noticeDTO) {
        try {
            NoticeDTO updatedNotice = noticeService.updateNotice(id, noticeDTO);
            if (updatedNotice != null) {
                return ResponseEntity.ok(updatedNotice);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete a notice (soft delete)
    @DeleteMapping("/api/notices/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteNotice(@PathVariable Long id) {
        try {
            boolean deleted = noticeService.deleteNotice(id);
            if (deleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get a specific notice by ID
    @GetMapping("/api/notices/{id}")
    @ResponseBody
    public ResponseEntity<NoticeDTO> getNoticeById(@PathVariable Long id) {
        try {
            NoticeDTO notice = noticeService.getNoticeById(id);
            if (notice != null) {
                return ResponseEntity.ok(notice);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}