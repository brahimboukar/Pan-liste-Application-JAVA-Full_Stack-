package com.example.back_End.service;

import com.example.back_End.dto.EtudeCibleRequest;
import com.example.back_End.dto.EtudeCibleResponse;
import com.example.back_End.model.*;
import com.example.back_End.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EtudeCibleService {

    private final EtudeRepository etudeRepository;
    private final SexeRepository sexeRepository;
    private final RegionRepository regionRepository;
    private final FonctionRepository fonctionRepository;
    private final FonctionDétaillerRepository fonctionDétaillerRepository;
    private final AgeRepository ageRepository;


    public EtudeCibleResponse listEtudeCible() {
        try {
            List<Etude> etudes = etudeRepository.findAll();
            List<Etude> etudeCibleList = etudes.stream()
                    .filter( etude -> !etude.getSexes().isEmpty() ||
                            !etude.getRegions().isEmpty() ||
                            !etude.getFonctions().isEmpty() ||
                            !etude.getFonctionDeteillers().isEmpty() ||
                            !etude.getAges().isEmpty() ||
                            !etude.getId().equals(null)
                            ).toList();
            if(etudeCibleList.isEmpty()) {
                return EtudeCibleResponse.builder()
                        .error("Aucune étude avec cibles affectées")
                        .statusCode(404)
                        .build();
            }
            return EtudeCibleResponse.builder()
                    .msg("Etudes avec cibles récupérées avec succès")
                    .data(etudeCibleList)
                    .statusCode(200)
                    .build();
        } catch (Exception e) {
            return EtudeCibleResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }
    public EtudeCibleResponse createEtudeCible(EtudeCibleRequest request) {
        try {
            Optional<Etude> etude = etudeRepository.findById(request.getEtude_id());
            if(!etude.isPresent()) {
                return EtudeCibleResponse.builder()
                        .error("Etude N'éxist Pas")
                        .statusCode(404)
                        .build();
            }

            Set<Sexe> sexe = new HashSet<>(sexeRepository.findAllById(request.getSexe_id()));
            Set<Region> regions = new HashSet<>(regionRepository.findAllById(request.getRegion_id()));
            Set<Fonction> fonctions = new HashSet<>(fonctionRepository.findAllById(request.getFonction_id()));
            Set<FonctionDeteiller> fonctionDeteillers = new HashSet<>(fonctionDétaillerRepository.findAllById(request.getFonction_detailler_id()));
            Set<Age> ages = new HashSet<>(ageRepository.findAllById(request.getAge_id()));

            if(request.getEtude_id() == null) {
                return EtudeCibleResponse.builder()
                        .error("Etude Null")
                        .statusCode(404)
                        .build();
            }
            if(sexe.isEmpty()) {
                return EtudeCibleResponse.builder()
                        .error("Sexe N'éxist Pas")
                        .statusCode(404)
                        .build();
            }
            if(regions.isEmpty()) {
                return EtudeCibleResponse.builder()
                        .error("Région N'éxist Pas")
                        .statusCode(404)
                        .build();
            }
            if(fonctions.isEmpty()) {
                return EtudeCibleResponse.builder()
                        .error("Fonction N'éxist Pas")
                        .statusCode(404)
                        .build();
            }
            if(fonctionDeteillers.isEmpty()) {
                return EtudeCibleResponse.builder()
                        .error("Fonction Détailler N'éxist Pas")
                        .statusCode(404)
                        .build();
            }
            if(ages.isEmpty()) {
                return EtudeCibleResponse.builder()
                        .error("Age N'éxist Pas")
                        .statusCode(404)
                        .build();
            }
            Etude edu = etude.get();
            if(!edu.getSexes().isEmpty() ||
                    !edu.getRegions().isEmpty() ||
                    !edu.getFonctions().isEmpty() ||
                    !edu.getFonctionDeteillers().isEmpty() ||
                    !edu.getAges().isEmpty()
            ) {
                return EtudeCibleResponse.builder()
                        .error("Cette étude a déjà des cibles affectées")
                        .statusCode(409)
                        .build();
            }
            edu.setSexes(sexe);
            edu.setRegions(regions);
            edu.setFonctions(fonctions);
            edu.setFonctionDeteillers(fonctionDeteillers);
            edu.setAges(ages);
            etudeRepository.save(edu);
            return EtudeCibleResponse.builder()
                    .msg("Etude Cible Créer Avec Succé")
                    .statusCode(200)
                    .build();

        } catch (Exception e) {
            return EtudeCibleResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

    //public EtudeCibleResponse supprimerEtudeCible()
}
