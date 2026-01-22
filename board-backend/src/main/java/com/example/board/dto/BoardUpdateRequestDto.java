package com.example.board.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardUpdateRequestDto {
	
	private String title;
	private String content;
	
	// 새로 업로드할 파일들
	private List<MultipartFile> newFiles;
	
	// 삭제할 기존 파일 ID 목록
	private List<Long> filesToDelete;

}
