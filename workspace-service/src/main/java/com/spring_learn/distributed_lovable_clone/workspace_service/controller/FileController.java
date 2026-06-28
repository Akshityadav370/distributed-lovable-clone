package com.spring_learn.distributed_lovable_clone.workspace_service.controller;

import com.spring_learn.distributed_lovable_clone.common_lib.dto.FileTreeDto;
import com.spring_learn.distributed_lovable_clone.workspace_service.dto.project.FileContentResponse;
import com.spring_learn.distributed_lovable_clone.workspace_service.dto.project.FileTreeResponse;
import com.spring_learn.distributed_lovable_clone.workspace_service.service.ProjectFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/projects/{projectId}/files")
public class FileController {

    private final ProjectFileService projectFileService;

    @GetMapping
    public ResponseEntity<FileTreeDto> getFileTree(@PathVariable Long projectId) {
        return ResponseEntity.ok(projectFileService.getFileTree(projectId));
    }

    @GetMapping("/content")
    public ResponseEntity<String> getFile(
            @PathVariable Long projectId,
            @RequestParam String path) {
        return ResponseEntity.ok(projectFileService.getFileContent(projectId, path));
    }

}
