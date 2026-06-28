package com.spring_learn.distributed_lovable_clone.account_service.dto.auth;

public record UserProfileResponse(
        Long id,
        String username,
        String name
) {
}
