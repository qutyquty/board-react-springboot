package com.example.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.board.entity.Comment;
import com.example.board.entity.CommentGuest;

@Repository
public interface CommentGuestRepository extends JpaRepository<CommentGuest, Long> {
	
	List<CommentGuest> findByBoardThjaId(Long boardThjaId);

}
