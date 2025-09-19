package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice")
@Data
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long noticeID;
    @Column(name = "notice_type")
    private String noticeType;
    private String title;
    private String content;
    @Column(name = "posted_at")
    private LocalDateTime postedAt;
    @ManyToOne
    @JoinColumn(name = "officer_id")
    private Officer officer;
}