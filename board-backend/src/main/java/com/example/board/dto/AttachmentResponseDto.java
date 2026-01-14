package com.example.board.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AttachmentResponseDto {
	
	private Long id;
	private String fileName;
	private String savedFileName;
	private String filePath;	
	private String fileType;
	private Long fileSize;
	private LocalDateTime uploadedAt;

}
