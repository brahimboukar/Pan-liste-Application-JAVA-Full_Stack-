package com.example.back_End.repository;

import com.example.back_End.model.Recomponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RecomponseRepository extends JpaRepository<Recomponse, Integer> {
    @Transactional(readOnly = true)
    Page<Recomponse> findByCategorieRecomponseId(Integer categorieId, Pageable pageable);

    boolean existsByLibelle(String libelle);

    boolean existsByCategorieRecomponseId(Integer categorieRecomponseId);

}
