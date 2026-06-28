package com.spring_learn.distributed_lovable_clone.workspace_service.service;


import com.spring_learn.distributed_lovable_clone.common_lib.dto.FileTreeDto;

public interface ProjectFileService {
    FileTreeDto getFileTree(Long projectId);

    String getFileContent(Long projectId, String path);

    void saveFile(Long projectId, String filePath, String fileContent);
}
