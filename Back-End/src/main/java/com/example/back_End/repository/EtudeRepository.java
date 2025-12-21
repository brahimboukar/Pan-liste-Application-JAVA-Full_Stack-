package com.example.back_End.repository;

import com.example.back_End.model.Etude;
import com.example.back_End.model.Sexe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtudeRepository extends JpaRepository<Etude , Integer> {

    boolean existsByLibelle(String libelle);


}
