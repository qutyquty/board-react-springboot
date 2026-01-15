package com.example.board.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.entity.BoardJal;
import com.example.board.service.BoardJalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/jals")
@RequiredArgsConstructor
public class BoardJalController {
	
	private final BoardJalService boardJalService;
	
	@PostMapping
	public ResponseEntity<BoardJal> createBoardJal(@ModelAttribute BoardRequestDto dto) {
		BoardJal boardJal = boardJalService.createBoardJal(dto);
		return ResponseEntity.ok(boardJal);
	}
	
	@GetMapping
	public ResponseEntity<List<BoardResponseDto>> getAllBoardJals() {
		List<BoardResponseDto> boardJals = boardJalService.getAllBoardJals();
		return ResponseEntity.ok(boardJals);
	}
	
	@GetMapping("/{id}")
	public BoardResponseDto getBoardJalDetail(@PathVariable("id") Long id) {
		return boardJalService.getBoardJalDetail(id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBoardJal(@PathVariable("id") Long id) {
		boardJalService.deleteBoardJal(id);
		return ResponseEntity.noContent().build();		
	}

}
