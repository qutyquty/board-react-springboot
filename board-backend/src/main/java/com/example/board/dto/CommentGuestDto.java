package com.example.board.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CommentGuestDto {
	
	private Long id;
	private String writerName;
	private String password;
	private String content;
	private Long boardThjaId;
	private LocalDateTime createdAt;

}
