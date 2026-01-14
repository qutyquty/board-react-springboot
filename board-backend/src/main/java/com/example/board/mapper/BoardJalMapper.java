package com.example.board.mapper;

import java.nio.file.Paths;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.board.dto.AttachmentResponseDto;
import com.example.board.dto.BoardJalRequestDto;
import com.example.board.dto.BoardJalResponseDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardJal;

@Component
public class BoardJalMapper {
	
	public BoardJal toBoardJalEntity(BoardJalRequestDto dto) {
		
		BoardJal boardJal = BoardJal.builder()
				.title(dto.getTitle())
				.content(dto.getContent())
				.build();
		
		return boardJal;
		
	}
	
	public Attachment toAttachmentEntity(MultipartFile file, BoardJal boardJal, String savedpath) {
		Attachment attachment = Attachment.builder()
				.fileName(file.getOriginalFilename())
				.savedFileName(Paths.get(savedpath).getFileName().toString())
				.filePath(savedpath)
				.fileSize(file.getSize())
				.fileType(file.getContentType())
				.boardJal(boardJal)
				.build();
		
		return attachment;
	}
	
	public BoardJalResponseDto toBoardJalResponseDto(BoardJal boardJal) {
		
		BoardJalResponseDto dto = new BoardJalResponseDto();
		dto.setId(boardJal.getId());
		dto.setTitle(boardJal.getTitle());
		dto.setContent(boardJal.getContent());
		dto.setCreatedAt(boardJal.getCreatedAt());
		dto.setUpdatedAt(boardJal.getUpdatedAt());
		
		if (boardJal.getAttachments() != null) {
			// 전체 첨부파일 리스트
			dto.setAttachments(
					boardJal.getAttachments().stream()
						.map(this::toAttachmentResponseDto)
						.collect(Collectors.toList())
			);
			
			// 랜덤 하나 선택
			int randomIndex = new Random().nextInt(boardJal.getAttachments().size());
			Attachment randomAttachment = boardJal.getAttachments().get(randomIndex);
			dto.setRandomAttachment(toAttachmentResponseDto(randomAttachment));
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
