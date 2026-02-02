package com.example.board.mapper;

import java.nio.file.Paths;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardFree;
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
	
	public BoardResponseDto toBoardResponseDto(BoardThja boardThja) {		
		BoardResponseDto dto = new BoardResponseDto();
		dto.setId(boardThja.getId());
		dto.setTitle(boardThja.getTitle());
		dto.setContent(boardThja.getContent());
		dto.setCreatedAt(boardThja.getCreatedAt());
		dto.setUpdatedAt(boardThja.getUpdatedAt());
		dto.setWriterName(boardThja.getWriter().getUsername());
		
		// 댓글 수
		dto.setCommentCount(boardThja.getCommentGuests() != null ? boardThja.getCommentGuests().size() : 0 );

		return dto;		
	}

}
