package com.example.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.board.entity.Attachment;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

}
