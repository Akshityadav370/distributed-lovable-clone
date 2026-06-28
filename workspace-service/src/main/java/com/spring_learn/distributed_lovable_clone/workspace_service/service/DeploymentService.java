package com.spring_learn.distributed_lovable_clone.workspace_service.service;

import com.spring_learn.distributed_lovable_clone.workspace_service.dto.project.DeployResponse;
import org.jspecify.annotations.Nullable;

public interface DeploymentService {
    @Nullable DeployResponse deploy(Long projectId);
}
