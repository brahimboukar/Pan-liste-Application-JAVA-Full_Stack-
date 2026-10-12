package com.example.back_End.repository;

import com.example.back_End.model.Etude;
import com.example.back_End.model.Sexe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface EtudeRepository extends JpaRepository<Etude , Integer> {

    @Transactional
    Page<Etude> findByCategorieEtudeId(Integer categorieId , Pageable pageable);
    boolean existsByLibelle(String libelle);

    boolean existsByCategorieEtudeId(Integer categorieEtudeId);


}
