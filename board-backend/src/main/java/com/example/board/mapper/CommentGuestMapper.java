package com.example.board.mapper;

import org.springframework.stereotype.Component;

import com.example.board.dto.CommentDto;
import com.example.board.dto.CommentGuestDto;
import com.example.board.entity.BoardThja;
import com.example.board.entity.Comment;
import com.example.board.entity.CommentGuest;

@Component
public class CommentGuestMapper {
	
	// Dto -> Entity
	public CommentGuest toEntity(CommentGuestDto dto, BoardThja board) {
		if (dto == null) return null;
		
		return CommentGuest.builder()
				.id(dto.getId())
				.writerName(dto.getWriterName())
				.password(dto.getPassword())
				.content(dto.getContent())
				.boardThja(board)
				.createdAt(dto.getCreatedAt())
				.build();
	}
		
	// Entity -> Dto
	public CommentGuestDto toDto(CommentGuest entity) {
		if (entity == null) return null;
		
		return CommentGuestDto.builder()
				.id(entity.getId())
				.writerName(entity.getWriterName())
				.password(entity.getPassword())
				.content(entity.getContent())
				.boardThjaId(entity.getBoardThja() != null ? entity.getBoardThja().getId() : null)
				.createdAt(entity.getCreatedAt())
				.build();
	}

}
