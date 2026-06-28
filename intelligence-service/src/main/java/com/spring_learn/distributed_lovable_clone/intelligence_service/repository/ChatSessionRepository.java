package com.spring_learn.distributed_lovable_clone.intelligence_service.repository;

import com.spring_learn.distributed_lovable_clone.intelligence_service.entity.ChatSession;
import com.spring_learn.distributed_lovable_clone.intelligence_service.entity.ChatSessionId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatSessionRepository extends JpaRepository<ChatSession, ChatSessionId> {
}
