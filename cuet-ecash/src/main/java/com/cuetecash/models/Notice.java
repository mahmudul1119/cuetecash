package com.cuetecash.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "Notice")
@Data
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeID;
    private String noticeType;
    private String title;
    private String content;
    private LocalDateTime postedAt;
    @ManyToOne
    @JoinColumn(name = "OfficerID")
    private Officer officer;
}