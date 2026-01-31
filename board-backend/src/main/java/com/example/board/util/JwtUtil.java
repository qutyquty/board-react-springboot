package com.example.board.util;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	// JWT 서명에 사용할 비밀키 (실제 서비스에서는 환경변수로 관리!)
	private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	
	// 토큰 유효시간 (예: 30분)
	private final long expiration = 1000 * 60 * 30;
	
	/**
	 * JWT 토큰 생성
	 * @param username 사용자 이름
	 * @return JWT 문자열
	 */
	public String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username) // 토큰 주체 (사용자 이름)
				.setIssuedAt(new Date()) // 발급 시간
				.setExpiration(new Date(System.currentTimeMillis() + expiration)) // 만료 시간
				.signWith(key) // 서명
				.compact();				
	}
	
	/**
	 * 토큰에서 사용자 이름 추출
	 */
	public String getUsername(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key) // 서명 검증용 키
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
	
	/**
	 * 토큰 유효성 검증
	 */
	public boolean validateToken(String token) {
		try {			
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true; // 파싱 성공 -> 유효한 토큰
		} catch (JwtException e) {
			return false; // 파싱 실패 -> 잘못된 토큰
		}
	}

}
