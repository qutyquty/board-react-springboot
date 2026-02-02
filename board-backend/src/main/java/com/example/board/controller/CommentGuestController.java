package com.example.board.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.dto.CommentDto;
import com.example.board.dto.CommentGuestDto;
import com.example.board.service.CommentGuestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts/{boardId}/commentGuests")
public class CommentGuestController {
	
	private final CommentGuestService commentGuestService;
	
	// 댓글 등록
	@PostMapping
	public CommentGuestDto addComment(@PathVariable("boardId") Long boardId, @RequestBody CommentGuestDto dto) {
		return commentGuestService.addComment(boardId, dto);
	}
	
	// 댓글 조회
	@GetMapping
	public List<CommentGuestDto> getComments(@PathVariable("boardId") Long boardId) {
		return commentGuestService.getComments(boardId);
	}
	
    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public void deleteComment(
    		@PathVariable("boardId") Long boardId, 
    		@PathVariable("commentId") Long commentId) {
        commentGuestService.deleteComment(commentId);
    }

}
