package com.example.back_End.repository;

import com.example.back_End.model.Age;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgeRepository extends JpaRepository<Age , Integer> {
}
