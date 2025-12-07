package com.example.back_End.repository;

import com.example.back_End.model.FonctionDeteiller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FonctionDétaillerRepository extends JpaRepository<FonctionDeteiller , Integer> {

    List<FonctionDeteiller> findByFonctionId(Long fonctionId);
}
