package com.example.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.board.entity.BoardJal;

@Repository
public interface BoardJalRepository extends JpaRepository<BoardJal, Long> {

}
