package com.spring_learn.distributed_lovable_clone.workspace_service.mapper;

import com.spring_learn.distributed_lovable_clone.workspace_service.dto.member.MemberResponse;
import com.spring_learn.distributed_lovable_clone.workspace_service.entity.ProjectMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectMemberMapper {

    @Mapping(target = "userId", source = "id.userId")
    @Mapping(target = "username", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "role", source = "projectRole")
    MemberResponse toProjectMemberResponseFromMember(ProjectMember projectMember);
}
