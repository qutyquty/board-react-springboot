package com.example.board.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.dto.CommentGuestDto;
import com.example.board.dto.PasswordDto;
import com.example.board.entity.CommentGuest;
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
	
    // 비밀번호 체크 후 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
    		@PathVariable("boardId") Long boardId, 
    		@PathVariable("commentId") Long commentId, 
    		@RequestBody PasswordDto dto) {
    	Boolean check = commentGuestService.checkPassword(commentId, dto);
    	
    	if (!check) {
    		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("비밀번호가 불일치 합니다.");
    	}
    	
        commentGuestService.deleteComment(commentId);
        
        return ResponseEntity.ok("삭제 완료");
    }
    
    // 댓글 비밀번호 검증
    @DeleteMapping("/{commentId}/check")
    public ResponseEntity<Boolean> checkPassword(
    		@PathVariable("boardId") Long boardId,
    		@PathVariable("commentId") Long commentId,
    		@RequestBody PasswordDto dto) {
    	
    	Boolean chk = commentGuestService.checkPassword(commentId, dto);
    	
    	return ResponseEntity.ok(chk);
    }

}
