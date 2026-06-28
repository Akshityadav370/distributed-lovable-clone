package com.spring_learn.distributed_lovable_clone.intelligence_service.service;

import com.spring_learn.distributed_lovable_clone.intelligence_service.dto.chat.StreamResponse;
import reactor.core.publisher.Flux;

public interface AiGenerationService {
    Flux<StreamResponse> streamResponse(String message, Long projectId);
}
