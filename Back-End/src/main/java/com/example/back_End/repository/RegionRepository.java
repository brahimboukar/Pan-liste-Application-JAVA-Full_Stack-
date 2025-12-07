package com.example.back_End.repository;

import com.example.back_End.model.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region , Integer> {
}
