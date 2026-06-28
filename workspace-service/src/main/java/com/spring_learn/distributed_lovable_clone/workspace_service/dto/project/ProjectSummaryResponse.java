package com.spring_learn.distributed_lovable_clone.workspace_service.dto.project;



import com.spring_learn.distributed_lovable_clone.common_lib.enums.ProjectRole;

import java.time.Instant;

public record ProjectSummaryResponse(
        Long id,
        String name,
        Instant createdAt,
        Instant updatedAt,
        ProjectRole role
) {
}
