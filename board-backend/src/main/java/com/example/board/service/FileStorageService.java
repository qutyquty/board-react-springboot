package com.example.board.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {
	
	@Value("${file.upload-dir}")
	private String uploadDir; // 절대 경로
	
	public String save(MultipartFile file) {
		try {
			String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();
			String fullPath = Paths.get(uploadDir, uniqueName).toString();
			
			File dest = new File(fullPath);
			dest.getParentFile().mkdirs(); // 폴더 없으면 생성
			file.transferTo(dest);
			
			return fullPath; // DB에는 경로 저장
		} catch (IOException e) {
			throw new RuntimeException("파일 저장 실패", e);
		}
	}

}
