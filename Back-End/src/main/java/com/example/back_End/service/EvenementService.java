package com.example.back_End.service;


import com.example.back_End.dto.EvenementRequest;
import com.example.back_End.dto.EvenementResponse;
import com.example.back_End.model.Evenements;
import com.example.back_End.repository.EvenementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EvenementService {

    private final EvenementRepository evenementRepository;

    public boolean evenementAlreadyExist(String libelle) {
        return evenementRepository.existsByLibelle(libelle);
    }

    public List<EvenementRequest> listDesEvenement() {
        List<Evenements> evenements = evenementRepository.findAll();
        return evenements.stream().map(Evenements::request).collect(Collectors.toList());
    }

    public EvenementResponse ajouterEvenement(EvenementRequest request) {
        try {
            if(evenementAlreadyExist(request.getLibelle())) {
                return EvenementResponse.builder()
                        .error("Evenment Déja Exist")
                        .statusCode(400)
                        .build();
            }
            Evenements evenements = new Evenements();
            evenements.setLibelle(request.getLibelle());
            evenements.setDescription(request.getDescription());
            evenements.setDateDebut(request.getDateDebut());
            evenements.setDateFin(request.getDateFin());
            if(!request.getDateFin().after(request.getDateDebut())) {
                return EvenementResponse.builder()
                        .error("dateFin doit être postérieure à dateDebut")
                        .statusCode(400)
                        .build();
            }
            if(request.getImg() != null && !request.getImg().isEmpty()){
                evenements.setImg(request.getImg().getBytes());
            }
            evenementRepository.save(evenements);
            return EvenementResponse.builder()
                    .msg("Evenement Créer Avec Succé")
                    .statusCode(200)
                    .data(evenements)
                    .build();
        } catch (Exception e) {
            return EvenementResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

    public EvenementResponse supprimerEvenment(Integer id) {
        try {
            Optional<Evenements> evenements = evenementRepository.findById(id);
            if(!evenements.isPresent()) {
                return EvenementResponse.builder()
                        .error("Evenement N'éxist Pas")
                        .statusCode(404)
                        .build();
            }
            evenementRepository.deleteById(id);
            return EvenementResponse.builder()
                    .msg("Evenement Supprimer Avec Succé")
                    .statusCode(200)
                    .build();
        } catch (Exception e) {
            return EvenementResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

    public EvenementResponse modifierEvenement(EvenementRequest request , Integer id) {
        try {
            Optional<Evenements> evenements = evenementRepository.findById(id);
            if(!evenements.isPresent()) {
                return EvenementResponse.builder()
                        .error("Evenement N'éxist Pas")
                        .statusCode(404)
                        .build();
            }
            Evenements eve = evenements.get();
            eve.setLibelle(request.getLibelle());
            eve.setDescription(request.getDescription());
            eve.setDateDebut(request.getDateDebut());
            eve.setDateFin(request.getDateFin());
            if(!request.getDateFin().after(request.getDateDebut())) {
                return EvenementResponse.builder()
                        .error("dateFin doit être postérieure à dateDebut")
                        .statusCode(400)
                        .build();
            }
            if(request.getImg()!= null && !request.getImg().isEmpty()) {
                eve.setImg(request.getImg().getBytes());
            }
            evenementRepository.save(eve);
            return EvenementResponse.builder()
                    .msg("Evenement Modifier Succé")
                    .statusCode(200)
                    .build();
        } catch (Exception e) {
            return EvenementResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }
}
