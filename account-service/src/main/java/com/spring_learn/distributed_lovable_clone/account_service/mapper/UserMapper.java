package com.spring_learn.distributed_lovable_clone.account_service.mapper;

import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.SignupRequest;
import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.UserProfileResponse;
import com.spring_learn.distributed_lovable_clone.account_service.entity.User;
import com.spring_learn.distributed_lovable_clone.common_lib.dto.UserDto;
import com.spring_learn.distributed_lovable_clone.common_lib.security.JwtUserPrincipal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(SignupRequest signupRequest);

    @Mapping(source = "userId", target = "id")
    UserProfileResponse toUserProfileResponse(JwtUserPrincipal user);

    UserDto toUserDto(User user);

}
