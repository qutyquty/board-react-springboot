package com.example.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.board.entity.BoardFree;

@Repository
public interface BoardFreeRepository extends JpaRepository<BoardFree, Long> {

}
