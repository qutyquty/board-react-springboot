package com.example.board.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "board_jal")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class BoardJal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
	@CreationTimestamp
	private LocalDateTime createdAt; // 생성일자 자동 입력
	
	@UpdateTimestamp
	private LocalDateTime updatedAt; // 수정일자 자동 입력
	
	@OneToMany(mappedBy = "boardJal", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Attachment> attachments;

}
