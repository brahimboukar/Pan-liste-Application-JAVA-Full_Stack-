package com.example.back_End.repository;

import com.example.back_End.model.Sexe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface SexeRepository extends JpaRepository<Sexe , Integer> {

}
