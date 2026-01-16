package com.example.board.mapper;

import java.nio.file.Paths;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.board.dto.AttachmentResponseDto;
import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardFree;
import com.example.board.entity.BoardThja;

@Component
public class BoardFreeMapper {
	
	public BoardFree toBoardFreeEntity(BoardRequestDto dto) {
		
		BoardFree boardFree = BoardFree.builder()
				.title(dto.getTitle())
				.content(dto.getContent())
				.build();
		
		return boardFree;
		
	}
	
	public Attachment toAttachmentEntity(MultipartFile file, BoardFree boardFree, String savedpath) {
		Attachment attachment = Attachment.builder()
				.fileName(file.getOriginalFilename())
				.savedFileName(Paths.get(savedpath).getFileName().toString())
				.filePath(savedpath)
				.fileSize(file.getSize())
				.fileType(file.getContentType())
				.boardFree(boardFree)
				.build();
		
		return attachment;
	}
	
	public BoardResponseDto toBoardResponseDto(BoardFree boardFree) {
		
		BoardResponseDto dto = new BoardResponseDto();
		dto.setId(boardFree.getId());
		dto.setTitle(boardFree.getTitle());
		dto.setContent(boardFree.getContent());
		dto.setCreatedAt(boardFree.getCreatedAt());
		dto.setUpdatedAt(boardFree.getUpdatedAt());
		
		if (boardFree.getAttachments() != null) {
			// 전체 첨부파일 리스트
			dto.setAttachments(
					boardFree.getAttachments().stream()
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
