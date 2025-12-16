package com.example.back_End.repository;

import com.example.back_End.model.CategorieEtude;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieEtudeRepository extends JpaRepository<CategorieEtude , Integer> {

    boolean existsByLibelle(String libelle);
}
