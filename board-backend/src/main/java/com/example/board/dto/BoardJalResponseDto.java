package com.example.board.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardJalResponseDto {
	
	private Long id;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private List<AttachmentResponseDto> attachments;
	private AttachmentResponseDto randomAttachment;

}
