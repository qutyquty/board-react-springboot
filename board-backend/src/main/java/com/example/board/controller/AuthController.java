package com.example.board.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.entity.User;
import com.example.board.repository.UserRepository;
import com.example.board.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	// 회원 가입
	@PostMapping("/signup")
	public String signup(@RequestBody User user) {		
		user.setPassword(passwordEncoder.encode(user.getPassword())); // 비밀번호 암호화
		user.setRole("USER");
		userRepository.save(user);
		return "회원가입 성공";
	}
	
	// 로그인 -> JWT 발급
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        try {
        	System.out.println("로그인 요청: " + user.getUsername() + " / " + user.getPassword());

            // 사용자 인증 시도
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            // 인증 성공 → JWT 발급
            String token = jwtUtil.generateToken(user.getUsername());
            
            // JSON 응답으로 변환
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            		.body(Map.of("error", "로그인 실패"));
        }
	}

}
