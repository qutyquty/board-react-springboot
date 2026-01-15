package com.example.board.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "attachment")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Attachment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String fileName; // 원본 파일명
	private String savedFileName; // 저장 파일명
	private String filePath; // 서버 저장 경로
	private Long fileSize; // 파일 크기
	private String fileType; // 파일 타입 (예: image/png, image/gif)
	
	@CreationTimestamp
	private LocalDateTime uploadedAt; // 업로드 시간 자동 입력
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "boardJal_id")
	private BoardJal boardJal;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "boardThja_id")
	private BoardThja boardThja;

}
