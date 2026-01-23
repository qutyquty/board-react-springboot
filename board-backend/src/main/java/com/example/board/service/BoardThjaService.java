package com.example.board.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.dto.BoardUpdateRequestDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardFree;
import com.example.board.entity.BoardThja;
import com.example.board.mapper.BoardThjaMapper;
import com.example.board.repository.BoardThjaRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardThjaService {
	
	private final BoardThjaRepository boardThjaRepository;
	private final BoardThjaMapper boardThjaMapper;
	
	public BoardThja createBoardThja(BoardRequestDto dto) {		
		BoardThja boardThja = boardThjaMapper.toBoardThjaEntity(dto);		
		boardThjaRepository.save(boardThja);		
		return boardThja;		
	}
	
	@Transactional(readOnly = true)
	public List<BoardResponseDto> getAllBoardThjas() {
		return boardThjaRepository.findAll().stream()
				.map(boardThjaMapper::toBoardResponseDto)
				.collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public BoardResponseDto getBoardThjaDetail(Long id) {
		BoardThja boardThja = boardThjaRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BoardThja not found"));
		
		return boardThjaMapper.toBoardResponseDto(boardThja);
	}
	
	public void deleteBoardThja(Long id) {
		BoardThja boardThja = boardThjaRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BoardThja not found"));
		
		// 게시글 삭제
		boardThjaRepository.delete(boardThja);
	}
	
	public void updateBoardThja(Long id, BoardUpdateRequestDto dto) {
		// 기존 게시글 조회
		BoardThja boardThja = boardThjaRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BoardThja not found"));
		
		// 제목, 내용 수정
		boardThja.setTitle(dto.getTitle());
		boardThja.setContent(dto.getContent());
		
		// 게시글 저장 (title, content 변경 반영)
		boardThjaRepository.save(boardThja);
	}
	
}
