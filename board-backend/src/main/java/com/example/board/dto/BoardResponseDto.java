package com.example.board.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardResponseDto {
	
	private Long id;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private List<AttachmentResponseDto> attachments;
	private AttachmentResponseDto randomAttachment; // Jal용
	private String writerName;
	
	// 댓글 수
	private int commentCount;

}
