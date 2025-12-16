package com.example.back_End.repository;

import com.example.back_End.model.CategorieRecomponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategorieRecomponseRepository extends JpaRepository<CategorieRecomponse , Integer> {

    boolean existsByLibelle(String libelle);


}
