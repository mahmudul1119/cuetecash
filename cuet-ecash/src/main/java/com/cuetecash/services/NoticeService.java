package com.cuetecash.services;

import com.cuetecash.dto.NoticeDTO;
import com.cuetecash.models.Notice;
import com.cuetecash.models.Officer;
import com.cuetecash.repositories.NoticeRepository;
import com.cuetecash.repositories.OfficerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private OfficerRepository officerRepository;

    public List<NoticeDTO> getAllNotices() {
        List<Notice> notices = noticeRepository.findAllByIsActiveTrueOrderByPostedAtDesc();
        return notices.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<NoticeDTO> getNoticesByType(String noticeType) {
        List<Notice> notices = noticeRepository.findByNoticeTypeAndIsActiveTrueOrderByPostedAtDesc(noticeType);
        return notices.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public NoticeDTO createNotice(NoticeDTO noticeDTO, String officerEmail) {
        Notice notice = new Notice();
        notice.setTitle(noticeDTO.getTitle());
        notice.setContent(noticeDTO.getContent());
        notice.setNoticeType(noticeDTO.getNoticeType());
        notice.setPostedAt(LocalDateTime.now());
        notice.setIsActive(true);

        // Find officer by email
        Optional<Officer> officer = officerRepository.findByUserEmail(officerEmail);
        if (officer.isPresent()) {
            notice.setOfficer(officer.get());
        }

        Notice savedNotice = noticeRepository.save(notice);
        return convertToDTO(savedNotice);
    }

    public NoticeDTO updateNotice(Long noticeId, NoticeDTO noticeDTO) {
        Optional<Notice> optionalNotice = noticeRepository.findById(noticeId);
        if (optionalNotice.isPresent()) {
            Notice notice = optionalNotice.get();
            notice.setTitle(noticeDTO.getTitle());
            notice.setContent(noticeDTO.getContent());
            notice.setNoticeType(noticeDTO.getNoticeType());
            notice.setUpdatedAt(LocalDateTime.now());

            Notice updatedNotice = noticeRepository.save(notice);
            return convertToDTO(updatedNotice);
        }
        return null;
    }

    public boolean deleteNotice(Long noticeId) {
        Optional<Notice> optionalNotice = noticeRepository.findById(noticeId);
        if (optionalNotice.isPresent()) {
            Notice notice = optionalNotice.get();
            notice.setIsActive(false);
            noticeRepository.save(notice);
            return true;
        }
        return false;
    }

    public NoticeDTO getNoticeById(Long noticeId) {
        Optional<Notice> optionalNotice = noticeRepository.findById(noticeId);
        return optionalNotice.map(this::convertToDTO).orElse(null);
    }

    private NoticeDTO convertToDTO(Notice notice) {
        NoticeDTO dto = new NoticeDTO();
        dto.setId(notice.getNoticeID());
        dto.setTitle(notice.getTitle());
        dto.setContent(notice.getContent());
        dto.setNoticeType(notice.getNoticeType());
        dto.setPostedAt(notice.getPostedAt().toLocalDate());
        
        if (notice.getOfficer() != null) {
            dto.setPostedBy(notice.getOfficer().getFullName());
        } else {
            dto.setPostedBy("System Admin");
        }
        
        return dto;
    }
} 