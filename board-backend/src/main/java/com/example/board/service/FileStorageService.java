package com.example.board.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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
	
	// 저장된 파일 풀경로를 받아서 Resource 반환
	public Resource load(String filePath) {
		try {
			Path path = Paths.get(filePath).normalize();
			Resource resource = new UrlResource(path.toUri());
			if (resource.exists() && resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("파일을 찾을 수 없습니다: " + filePath);
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("파일 경로 오류: " + filePath, e);
		}
	}
	
	// 저장된 파일 풀경로 에서 원래 파일명만 추출
	// UUID_원래이름 형태라면 UUID 제거 후 반환
	public String getOriginalName(String filePath) {
		Path path = Paths.get(filePath);
		String fullName = path.getFileName().toString();
		
		// UUID 제거 로직: 첫번째 '_' 이후 문자열만 반화
		int underscoreIndex = fullName.indexOf("_");
		if (underscoreIndex != -1 && underscoreIndex < fullName.length() - 1) {
			return fullName.substring(underscoreIndex + 1);
		}
		return fullName; // '_' 없으면 그대로 반환
	}

}
