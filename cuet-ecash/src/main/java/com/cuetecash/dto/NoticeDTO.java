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
}
