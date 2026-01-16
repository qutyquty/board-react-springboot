package com.example.board.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Value("${file.upload-dir}")
	private String uploadDir;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// /files/** 요청을 실제 서버 폴더로 매핑
		registry.addResourceHandler("/files/**")
			.addResourceLocations("file:" + uploadDir + "/");
	}
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**") // 모든 API 경로 허용
	        .allowedOrigins("*")
	        .allowedMethods("*")
	        .allowedHeaders("*");
//			.allowedOrigins("*") // 프론트엔드 주소
//			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//			.allowedHeaders("*")
//			.allowCredentials(true);
	}

}
