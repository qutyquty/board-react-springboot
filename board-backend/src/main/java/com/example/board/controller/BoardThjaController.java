package com.example.board.controller;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriUtils;

import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.entity.BoardThja;
import com.example.board.service.BoardThjaService;
import com.example.board.service.FileStorageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/thjas")
@RequiredArgsConstructor
public class BoardThjaController {
	
	private final BoardThjaService boardThjaService;
	private final FileStorageService fileStorageService;
	
	@PostMapping
	public ResponseEntity<BoardThja> createBoardJal(@ModelAttribute BoardRequestDto dto) {
		BoardThja boardThja = boardThjaService.createBoardThja(dto);
		return ResponseEntity.ok(boardThja);
	}
	
	@GetMapping
	public ResponseEntity<List<BoardResponseDto>> getAllBoardThjas() {
		List<BoardResponseDto> boardThjas = boardThjaService.getAllBoardThjas();
		return ResponseEntity.ok(boardThjas);
	}
	
	@GetMapping("/{id}")
	public BoardResponseDto getBoardThjaDetail(@PathVariable("id") Long id) {
		return boardThjaService.getBoardThjaDetail(id);
	}
	
	@GetMapping("/files")
	public ResponseEntity<Resource> downlaodFiel(@RequestParam("filePath") String filePath) {
		Resource resource = fileStorageService.load(filePath);
		String originalName = fileStorageService.getOriginalName(filePath);
		
		// 한글/공백 파일명 깨짐 방지
		String encodedName = UriUtils.encode(originalName, StandardCharsets.UTF_8);
		
	    return ResponseEntity.ok()
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedName + "\"")
	            .contentType(MediaType.APPLICATION_OCTET_STREAM)
	            .body(resource);

	}

}
