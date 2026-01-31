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
	// Spring MVC 레벨에서 CORS를 처리
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
	        .allowedOrigins("http://localhost:5173") // 허용할 프론트엔드 도메인
	        .allowedMethods("*")
	        .allowedHeaders("*")
	        .allowCredentials(true);
	}

}
