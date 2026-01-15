package com.example.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.board.entity.BoardThja;

@Repository
public interface BoardThjaRepository extends JpaRepository<BoardThja, Long> {

}
