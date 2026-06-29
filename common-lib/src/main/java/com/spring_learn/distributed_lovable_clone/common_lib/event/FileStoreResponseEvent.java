package com.spring_learn.distributed_lovable_clone.common_lib.event;

import lombok.Builder;

@Builder
public record FileStoreResponseEvent(
        String sagaId,
        boolean success,
        String errorMessage,
        Long projectId
) {}