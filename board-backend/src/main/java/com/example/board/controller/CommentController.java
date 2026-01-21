package com.example.board.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.dto.CommentDto;
import com.example.board.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts/{boardId}/comments")
public class CommentController {
	
	private final CommentService commentService;
	
	// 댓글 등록
	@PostMapping
	public CommentDto addComment(@PathVariable("boardId") Long boardId, @RequestBody CommentDto dto) {
		System.out.println("boardId: " + boardId);
		return commentService.addComment(boardId, dto);
	}
	
	// 댓글 조회
	@GetMapping
	public List<CommentDto> getComments(@PathVariable("boardId") Long boardId) {
		return commentService.getComments(boardId);
	}
	
    // 댓글 수정
    @PutMapping("/{commentId}")
    public CommentDto updateComment(
    		@PathVariable("boardId") Long boardId, 
    		@PathVariable("commentId") Long commentId, 
    		@RequestBody CommentDto dto) {
        return commentService.updateComment(commentId, dto);
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public void deleteComment(
    		@PathVariable("boardId") Long boardId, 
    		@PathVariable("commentId") Long commentId) {
    	System.out.println("commentId: " + commentId);
        commentService.deleteComment(commentId);
    }

}
