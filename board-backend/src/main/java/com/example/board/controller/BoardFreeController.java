package com.example.board.controller;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriUtils;

import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.dto.BoardUpdateRequestDto;
import com.example.board.entity.BoardFree;
import com.example.board.security.CustomUserDetails;
import com.example.board.service.BoardFreeService;
import com.example.board.service.FileStorageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/frees")
@RequiredArgsConstructor
public class BoardFreeController {
	
	private final BoardFreeService boardFreeService;
	private final FileStorageService fileStorageService;
	
	@PostMapping
	public ResponseEntity<BoardFree> createBoardFree(
			@ModelAttribute BoardRequestDto dto, 
			@AuthenticationPrincipal CustomUserDetails userDetails) {
		
		BoardFree boardFree = boardFreeService.createBoardFree(dto, userDetails);
		return ResponseEntity.ok(boardFree);
	}
	
	@GetMapping
	public Page<BoardResponseDto> getAllBoardFreesPagination(
			Pageable pageable, 
			@RequestParam(value = "keyword", required = false) String keyword) {
		return boardFreeService.getAllBoardFreesPagination(pageable, keyword);
	}
	
	@GetMapping("/{id}")
	public BoardResponseDto getBoardFreeDetail(@PathVariable("id") Long id) {
		return boardFreeService.getBoardFreeDetail(id);
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
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBoardFree(@PathVariable("id") Long id) {
		boardFreeService.deleteBoardFree(id);
		return ResponseEntity.noContent().build();		
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateBoardFree(
			@PathVariable("id") Long id,
			@ModelAttribute BoardUpdateRequestDto dto
	) {
		boardFreeService.updateBoardFree(id, dto);
		return ResponseEntity.ok().build();
	}

}
