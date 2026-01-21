package com.example.board.mapper;

import org.springframework.stereotype.Component;

import com.example.board.dto.CommentDto;
import com.example.board.entity.BoardThja;
import com.example.board.entity.Comment;

@Component
public class CommentMapper {
	
	// Dto -> Entity
	public Comment toEntity(CommentDto dto, BoardThja board) {
		if (dto == null) return null;
		
		return Comment.builder()
				.id(dto.getId())
				.content(dto.getContent())
				.boardThja(board)
				.createdAt(dto.getCreatedAt())
				.updatedAt(dto.getUpdatedAt())
				.build();
	}
	
	// Entity -> Dto
	public CommentDto toDto(Comment entity) {
		if (entity == null) return null;
		
		return CommentDto.builder()
				.id(entity.getId())
				.content(entity.getContent())
				.boardThjaId(entity.getBoardThja() != null ? entity.getBoardThja().getId() : null)
				.createdAt(entity.getCreatedAt())
				.updatedAt(entity.getUpdatedAt())
				.build();
	}

}
