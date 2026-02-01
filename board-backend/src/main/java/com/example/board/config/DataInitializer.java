package com.example.board.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.board.entity.BoardFree;
import com.example.board.entity.User;
import com.example.board.repository.BoardFreeRepository;
import com.example.board.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
	
	private final BoardFreeRepository boardFreeRepository;
	private final UserRepository userRepository;
	
	@Override
	public void run(String... args) throws Exception {
		if (boardFreeRepository.count() == 0) { // 이미 데이터가 있으면 중복 방지
			User writer = userRepository.findByUsername("rina")
					.orElseThrow(() -> new RuntimeException("User not found"));
			
			for (int i = 1; i <= 300; i++) {
				BoardFree board = new BoardFree();
				board.setTitle("테스트 제목 " + i);
				board.setContent("테스트 내용 " + i);
				board.setWriter(writer);
				boardFreeRepository.save(board);
			}
		}		
	}

}
