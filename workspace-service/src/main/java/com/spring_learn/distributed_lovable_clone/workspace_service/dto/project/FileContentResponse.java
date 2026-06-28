package com.spring_learn.distributed_lovable_clone.workspace_service.dto.project;

public record FileContentResponse(
        String path,
        String content
) {
}
