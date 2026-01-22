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

import com.example.board.dto.BoardRequestDto;
import com.example.board.dto.BoardResponseDto;
import com.example.board.dto.BoardUpdateRequestDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardFree;
import com.example.board.mapper.BoardFreeMapper;
import com.example.board.repository.AttachmentRepository;
import com.example.board.repository.BoardFreeRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardFreeService {

	private final BoardFreeRepository boardFreeRepository;
	private final AttachmentRepository attachmentRepository;
	private final FileStorageService fileStorageService; // 실제 파일 저장 담당
	private final BoardFreeMapper boardFreeMapper;
	
	@Value("${file.upload-dir}")
	private String uploadDir; // 절대 경로
	
	public BoardFree createBoardFree(BoardRequestDto dto) {
		
		BoardFree boardFree = boardFreeMapper.toBoardFreeEntity(dto);
		
		boardFreeRepository.save(boardFree);
		
		if (dto.getFiles() != null) {
			dto.getFiles().stream()
				.filter(file -> file != null && !file.isEmpty())
				.forEach(file -> {
					String savedPath = fileStorageService.save(file);
					Attachment attachment = boardFreeMapper.toAttachmentEntity(file, boardFree, savedPath);
					attachmentRepository.save(attachment);
				});
		}
		
		return boardFree;
		
	}
	
	@Transactional(readOnly = true)
	public List<BoardResponseDto> getAllBoardFrees() {
		return boardFreeRepository.findAll().stream()
				.map(boardFreeMapper::toBoardResponseDto)
				.collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public BoardResponseDto getBoardFreeDetail(Long id) {
		BoardFree boardFree = boardFreeRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BoardFree not found"));
		
		return boardFreeMapper.toBoardResponseDto(boardFree);
	}
	
	public void deleteBoardFree(Long id) {
		BoardFree boardFree = boardFreeRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BoardFree not found"));
		
		// 첨부파일 삭제 (파일 시스템+DB)
		boardFree.getAttachments().forEach(att -> {
			Path path = Paths.get(att.getFilePath()); // DB에 저장된 file_path 사용
			try {
				Files.deleteIfExists(path); // 실제 파일 삭제
			} catch (IOException e) {
				// 로그만 남기고 계속 진행
				e.printStackTrace();
			}
		});
		
		// 게시글 삭제
		boardFreeRepository.delete(boardFree);
	}
	
	public void updateBoardFree(Long id, BoardUpdateRequestDto dto) {
		// 기존 게시글 조회
		BoardFree boardFree = boardFreeRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BoardFree not found"));
		
		// filesToDelete 처리
		if (dto.getFilesToDelete() != null && !dto.getFilesToDelete().isEmpty()) {
			boardFree.getAttachments().removeIf(att -> {
				if (dto.getFilesToDelete().contains(att.getId())) {
					// 실제 파일 삭제
					Path path = Paths.get(att.getFilePath());
					try {
						Files.deleteIfExists(path);						
					} catch (IOException e) {
						// 로그만 남기고 계속 진행
						e.printStackTrace();
					}
					// removeIf 조건 만족 -> orphanRemoval에 의해 DB에서도 삭제됨
					return true; // 리스트에서 제거 
				}
				return false; // 리스트 유지
			});
//			dto.getFilesToDelete().forEach(fileId -> {
//				boardFree.getAttachments().stream()
//					.filter(att -> att.getId().equals(fileId))
//					.findFirst()
//					.ifPresent(att -> {
//						// 실제 파일 삭제
//						Path path = Paths.get(att.getFilePath());
//						try {
//							Files.deleteIfExists(path);
//						} catch (IOException e) {
//							// 로그만 남기고 계속 진행
//							e.printStackTrace();
//						}
//						
//						// DB에서 첨부파일 삭제
//						attachmentRepository.delete(att);
//					});
//			});
		}
		
		// 제목, 내용 수정
		boardFree.setTitle(dto.getTitle());
		boardFree.setContent(dto.getContent());
		
		// 새 파일 업로드 처리
		if (dto.getNewFiles() != null) {
			dto.getNewFiles().stream()
				.filter(file -> file != null && !file.isEmpty())
				.forEach(file -> {
					// 실제 파일 저장
					String savedPath = fileStorageService.save(file);
					
					// 첨부파일 엔티티 생성
					Attachment attachment = boardFreeMapper.toAttachmentEntity(file, boardFree, savedPath);
					
					// DB 저장
					attachmentRepository.save(attachment);
				});
		}
		
		// 게시글 저장 (title, content 변경 반영)
		boardFreeRepository.save(boardFree);
	}

}
