package com.example.board.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.dto.BoardJalRequestDto;
import com.example.board.dto.BoardJalResponseDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardJal;
import com.example.board.mapper.BoardJalMapper;
import com.example.board.repository.AttachmentRepository;
import com.example.board.repository.BoardJalRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardJalService {
	
	private final BoardJalRepository boardJalRepository;
	private final AttachmentRepository attachmentRepository;
	private final FileStorageService fileStorageService; // 실제 파일 저장 담당
	private final BoardJalMapper boardJalMapper;
	
	@Value("${file.upload-dir}")
	private String uploadDir; // 절대 경로
	
	public BoardJal createBoardJal(BoardJalRequestDto dto) {
		
		BoardJal boardJal = boardJalMapper.toBoardJalEntity(dto);
		
		boardJalRepository.save(boardJal);
		
		if (dto.getFiles() != null) {
			dto.getFiles().stream()
				.filter(file -> file != null && !file.isEmpty())
				.forEach(file -> {
					String savedPath = fileStorageService.save(file);
					Attachment attachment = boardJalMapper.toAttachmentEntity(file, boardJal, savedPath);
					attachmentRepository.save(attachment);
				});
		}
		
		return boardJal;
		
	}
	
	@Transactional(readOnly = true)
	public List<BoardJalResponseDto> getAllBoardJals() {
		return boardJalRepository.findAll().stream()
				.map(boardJalMapper::toBoardJalResponseDto)
				.collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public BoardJalResponseDto getBoardJalDetail(Long id) {
		BoardJal boardJal = boardJalRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BoardJal not found"));
		
		return boardJalMapper.toBoardJalResponseDto(boardJal);
	}
	
	public void deleteBoardJal(Long id) {
		BoardJal boardJal = boardJalRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BoardJal not found"));
		
		// 첨부파일 삭제 (파일 시스템+DB)
		boardJal.getAttachments().forEach(att -> {
			Path path = Paths.get(att.getFilePath()); // DB에 저장된 file_path 사용
			try {
				Files.deleteIfExists(path); // 실제 파일 삭제
			} catch (IOException e) {
				// 로그만 남기고 계속 진행
				e.printStackTrace();
			}
		});
		
		// 게시글 삭제
		boardJalRepository.delete(boardJal);
	}
}
