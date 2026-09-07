package com.example.back_End.repository;

import com.example.back_End.model.Recomponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecomponseRepository extends JpaRepository<Recomponse, Integer> {
    Page<Recomponse> findByCategorieRecomponse_Id(Integer categorieId, Pageable pageable);

}
