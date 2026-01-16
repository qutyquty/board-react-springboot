package com.example.board.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.dto.BoardResponseDto;
import com.example.board.dto.BoardRequestDto;
import com.example.board.entity.Attachment;
import com.example.board.entity.BoardJal;
import com.example.board.entity.BoardThja;
import com.example.board.mapper.BoardFreeMapper;
import com.example.board.repository.AttachmentRepository;
import com.example.board.repository.BoardThjaRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardThjaService {
	

}
