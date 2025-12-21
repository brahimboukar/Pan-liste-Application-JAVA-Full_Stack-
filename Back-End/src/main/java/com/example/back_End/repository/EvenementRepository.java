package com.example.back_End.repository;

import com.example.back_End.model.Evenements;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvenementRepository extends JpaRepository<Evenements , Integer> {

    boolean existsByLibelle(String libelle);
}
