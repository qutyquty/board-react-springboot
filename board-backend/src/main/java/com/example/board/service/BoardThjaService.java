package com.example.board.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.dto.BoardResponseDto;
import com.example.board.dto.BoardRequestDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardJal;
import com.example.board.entity.BoardThja;
import com.example.board.mapper.BoardThjaMapper;
import com.example.board.repository.AttachmentRepository;
import com.example.board.repository.BoardThjaRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardThjaService {
	
	private final BoardThjaRepository boardThjaRepository;
	private final AttachmentRepository attachmentRepository;
	private final FileStorageService fileStorageService; // 실제 파일 저장 담당
	private final BoardThjaMapper boardThjaMapper;
	
	@Value("${file.upload-dir}")
	private String uploadDir; // 절대 경로
	
	public BoardThja createBoardThja(BoardRequestDto dto) {
		
		BoardThja boardThja = boardThjaMapper.toBoardThjaEntity(dto);
		
		boardThjaRepository.save(boardThja);
		
		if (dto.getFiles() != null) {
			dto.getFiles().stream()
				.filter(file -> file != null && !file.isEmpty())
				.forEach(file -> {
					String savedPath = fileStorageService.save(file);
					Attachment attachment = boardThjaMapper.toAttachmentEntity(file, boardThja, savedPath);
					attachmentRepository.save(attachment);
				});
		}
		
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

}
