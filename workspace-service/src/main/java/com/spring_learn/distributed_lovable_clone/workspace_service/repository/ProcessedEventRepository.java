package com.spring_learn.distributed_lovable_clone.workspace_service.repository;

import com.spring_learn.distributed_lovable_clone.workspace_service.entity.ProcessedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedEventRepository extends JpaRepository<ProcessedEvent, String> {
}
