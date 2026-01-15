package com.example.board.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardRequestDto {
	
	private String title;
	private String content;
	
	// 첨부파일 최대 3개
	private List<MultipartFile> files;

}
