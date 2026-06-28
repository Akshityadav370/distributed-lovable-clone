package com.spring_learn.distributed_lovable_clone.account_service.mapper;

import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.SignupRequest;
import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.UserProfileResponse;
import com.spring_learn.distributed_lovable_clone.account_service.entity.User;
import com.spring_learn.distributed_lovable_clone.common_lib.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(SignupRequest signupRequest);

    UserProfileResponse toUserProfileResponse(User user);

    UserDto toUserDto(User user);

}
