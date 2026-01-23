package com.example.board.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.dto.BoardUpdateRequestDto;
import com.example.board.entity.BoardThja;
import com.example.board.service.BoardThjaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/thjas")
@RequiredArgsConstructor
public class BoardThjaController {
	
	private final BoardThjaService boardThjaService;
	
	@PostMapping
	public ResponseEntity<BoardThja> createBoardThja(@ModelAttribute BoardRequestDto dto) {
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
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBoardFree(@PathVariable("id") Long id) {
		boardThjaService.deleteBoardThja(id);
		return ResponseEntity.noContent().build();		
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateBoardFree(
			@PathVariable("id") Long id,
			@ModelAttribute BoardUpdateRequestDto dto
	) {
		boardThjaService.updateBoardThja(id, dto);
		return ResponseEntity.ok().build();
	}

}
