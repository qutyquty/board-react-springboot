package com.example.board.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.dto.CommentDto;
import com.example.board.entity.BoardThja;
import com.example.board.entity.Comment;
import com.example.board.mapper.CommentMapper;
import com.example.board.repository.BoardThjaRepository;
import com.example.board.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
	
	private final CommentRepository commentRepository;
	private final BoardThjaRepository boardThjaRepository;
	private final CommentMapper commentMapper;
	
	// 댓글 등록
	public CommentDto addComment(Long boardThjaId, CommentDto dto) {
		BoardThja board = boardThjaRepository.findById(boardThjaId)
				.orElseThrow(() -> new IllegalArgumentException("BoardThja not found"));
		
		Comment comment = commentMapper.toEntity(dto, board);
		Comment saved = commentRepository.save(comment);
		
		return commentMapper.toDto(saved);
	}
	
	// 댓글 조회
	public List<CommentDto> getComments(Long boardThjaId) {
		return commentRepository.findByBoardThjaId(boardThjaId)
				.stream()
				.map(commentMapper::toDto)
				.toList();
	}
	
	// 댓글 수정
    public CommentDto updateComment(Long commentId, CommentDto dto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 없음"));

        comment.setContent(dto.getContent());

        return commentMapper.toDto(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

}
