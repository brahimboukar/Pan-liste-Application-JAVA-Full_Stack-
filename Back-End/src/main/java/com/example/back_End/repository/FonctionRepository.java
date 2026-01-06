package com.example.back_End.repository;

import com.example.back_End.model.Fonction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FonctionRepository extends JpaRepository<Fonction, Integer> {
    public List<Fonction> findAllByOrderByIdAsc();
}
