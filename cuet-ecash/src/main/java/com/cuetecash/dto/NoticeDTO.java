package com.cuetecash.dto;

import lombok.Data;
import java.time.LocalDate;

/**
 * Data Transfer Object for displaying notices.
 * This class represents a single notice entry on the notice page.
 */
@Data
public class NoticeDTO {
    private String title;
    private String content;
    private LocalDate publishDate;

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }
}
