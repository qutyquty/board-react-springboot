package com.example.board.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.board.entity.BoardFree;

@Repository
public interface BoardFreeRepository extends JpaRepository<BoardFree, Long> {
	
	// JOIN FETCH b.writer -> BoardFree와 User를 한 번에 가져옴
	@Query("SELECT b FROM BoardFree b JOIN FETCH b.writer ORDER BY b.createdAt DESC")
	List<BoardFree> findAllWithWriterOrderByCreatedAtDesc();
	
	@Query(value = "SELECT b FROM BoardFree b JOIN FETCH b.writer",
			countQuery = "SELECT count(b) FROM BoardFree b")
	Page<BoardFree> findAllWithWriterPagination(Pageable pageable);
	
	@Query(
		value = "SELECT b FROM BoardFree b JOIN FETCH b.writer " +
				"WHERE (:keyword IS NULL OR b.title LIKE %:keyword% " +
				"	OR b.content LIKE %:keyword% " +
				"	OR b.writer.username LIKE %:keyword%)",
		countQuery = "SELECT count(b) FROM BoardFree b " +
					"WHERE (:keyword IS NULL OR b.title LIKE %:keyword% " +
					"	OR b.content LIKE %:keyword% " +
					"	OR b.writer.username LIKE %:keyword%)"
	)
	Page<BoardFree> searchBoardFree(@Param("keyword") String keyword, Pageable pageable);

}
