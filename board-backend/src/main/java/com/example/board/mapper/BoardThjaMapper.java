package com.example.board.mapper;

import java.nio.file.Paths;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.board.dto.AttachmentResponseDto;
import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardJal;
import com.example.board.entity.BoardThja;

@Component
public class BoardThjaMapper {
	
	public BoardThja toBoardThjaEntity(BoardRequestDto dto) {
		
		BoardThja boardThja = BoardThja.builder()
				.title(dto.getTitle())
				.content(dto.getContent())
				.build();
		
		return boardThja;
		
	}
	
	public Attachment toAttachmentEntity(MultipartFile file, BoardThja boardThja, String savedpath) {
		Attachment attachment = Attachment.builder()
				.fileName(file.getOriginalFilename())
				.savedFileName(Paths.get(savedpath).getFileName().toString())
				.filePath(savedpath)
				.fileSize(file.getSize())
				.fileType(file.getContentType())
				.boardThja(boardThja)
				.build();
		
		return attachment;
	}
	
	public BoardResponseDto toBoardResponseDto(BoardThja boardThja) {
		
		BoardResponseDto dto = new BoardResponseDto();
		dto.setId(boardThja.getId());
		dto.setTitle(boardThja.getTitle());
		dto.setContent(boardThja.getContent());
		dto.setCreatedAt(boardThja.getCreatedAt());
		dto.setUpdatedAt(boardThja.getUpdatedAt());
		
		if (boardThja.getAttachments() != null) {
			// 전체 첨부파일 리스트
			dto.setAttachments(
					boardThja.getAttachments().stream()
						.map(this::toAttachmentResponseDto)
						.collect(Collectors.toList())
			);
		}
		
		return dto;
		
	}
	
	public AttachmentResponseDto toAttachmentResponseDto(Attachment attachment) {
		AttachmentResponseDto dto = new AttachmentResponseDto();
		dto.setId(attachment.getId());
		dto.setFileName(attachment.getFileName());
		dto.setSavedFileName(attachment.getSavedFileName());
		dto.setFilePath(attachment.getFilePath());
		dto.setFileType(attachment.getFileType());
		dto.setFileSize(attachment.getFileSize());
		dto.setUploadedAt(attachment.getUploadedAt());
		return dto;
	}	

}
