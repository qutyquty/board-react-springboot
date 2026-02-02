package com.example.board.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.board.dto.CommentDto;
import com.example.board.dto.CommentGuestDto;
import com.example.board.entity.BoardThja;
import com.example.board.entity.Comment;
import com.example.board.entity.CommentGuest;
import com.example.board.mapper.CommentGuestMapper;
import com.example.board.repository.BoardThjaRepository;
import com.example.board.repository.CommentGuestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentGuestService {
	
	private final CommentGuestRepository commentGuestRepository;
	private final BoardThjaRepository boardThjaRepository;
	private final CommentGuestMapper commentGuestMapper;
	private final PasswordEncoder passwordEncoder;
	
	// 댓글 등록
	public CommentGuestDto addComment(Long boardThjaId, CommentGuestDto dto) {
		BoardThja board = boardThjaRepository.findById(boardThjaId)
				.orElseThrow(() -> new IllegalArgumentException("BoardThja not found"));
		
		String hashedPassword = passwordEncoder.encode(dto.getPassword());		
		
		CommentGuest comment = commentGuestMapper.toEntity(dto, board);
		comment.setPassword(hashedPassword);
		CommentGuest saved = commentGuestRepository.save(comment);
		
		return commentGuestMapper.toDto(saved);
	}
	
	// 댓글 조회
	public List<CommentGuestDto> getComments(Long boardThjaId) {
		return commentGuestRepository.findByBoardThjaId(boardThjaId)
				.stream()
				.map(commentGuestMapper::toDto)
				.toList();
	}
	
    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentGuestRepository.deleteById(commentId);
    }

}
