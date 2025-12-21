package com.example.back_End.service;

import com.example.back_End.dto.CategorieEtudeRequest;
import com.example.back_End.dto.CategorieEtudeResponse;
import com.example.back_End.dto.EtudeRequest;
import com.example.back_End.dto.EtudeResponse;
import com.example.back_End.model.CategorieEtude;
import com.example.back_End.model.Etude;
import com.example.back_End.repository.CategorieEtudeRepository;
import com.example.back_End.repository.EtudeRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EtudeService {

    private final CategorieEtudeRepository categorieEtudeRepository;

    private final EtudeRepository etudeRepository;

    public boolean AlreadyExistLibelle(String libelle) {
        return categorieEtudeRepository.existsByLibelle(libelle);
    }

    public CategorieEtudeResponse listCategorie() {
        try {
            List<CategorieEtude> list = categorieEtudeRepository.findAll();
            if(list.isEmpty()) {
                return CategorieEtudeResponse.builder()
                        .msg("Aucun Catégorie ")
                        .statusCode(204)
                        .build();
            }
            return CategorieEtudeResponse.builder()
                    .msg("Liste Des Categorie Etude : ")
                    .statusCode(200)
                    .data(list)
                    .build();

        }
        catch (Exception e) {
            return CategorieEtudeResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

    public CategorieEtudeResponse createCategorie(CategorieEtudeRequest request) {
        try {
            if(AlreadyExistLibelle(request.getLibelle())){
                return CategorieEtudeResponse.builder()
                        .error("Catégorie Deja Existe")
                        .statusCode(400)
                        .build();
            }
            var cate = CategorieEtude.builder()
                    .libelle(request.getLibelle())
                    .build();
            categorieEtudeRepository.save(cate);
            return CategorieEtudeResponse.builder()
                    .msg("Catégorie Ajouté Avec Succé")
                    .statusCode(200)
                    .build();

        } catch (Exception e) {
            return CategorieEtudeResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }

    }
    public CategorieEtudeResponse deteleCategorie(Integer id) {
        try {
            Optional <CategorieEtude> categorieEtude = categorieEtudeRepository.findById(id);
            if(!categorieEtude.isPresent()){
                return CategorieEtudeResponse.builder()
                        .error("Categorie Etude Non Trouver")
                        .statusCode(404)
                        .build();
            }
            categorieEtudeRepository.deleteById(id);
            return CategorieEtudeResponse.builder()
                    .msg("Catégorie Supprimer  Avec Succé")
                    .statusCode(200)
                    .build();

        } catch (Exception e) {
            return CategorieEtudeResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }
    public boolean alreadyExistLibelle(String libelle) {
        return etudeRepository.existsByLibelle(libelle);
    }

    public EtudeResponse createEtude(EtudeRequest request) {
        try {
            if(alreadyExistLibelle(request.getLibelle())) {
                return EtudeResponse.builder()
                        .error("Etude Déja Existe")
                        .statusCode(400)
                        .build();
            }
            Optional<CategorieEtude> cat = categorieEtudeRepository.findById(request.getCategorie_id().getId());
            if(!cat.isPresent()) {
                return EtudeResponse.builder()
                        .error("Catégorie Etude N'existe Pas")
                        .statusCode(404)
                        .build();
            }
            Etude etude = new Etude();
            etude.setLibelle(request.getLibelle());
            etude.setPoint(request.getPoint());
            etude.setDescription(request.getDescription());
            etude.setDurré(request.getDurré());
            etude.setCategorieEtude(request.getCategorie_id());
            etude.setCreated_at(new Date(System.currentTimeMillis()));
            if (request.getImg() != null && !request.getImg().isEmpty()) {
                etude.setImg(request.getImg().getBytes());
            }
            etudeRepository.save(etude);
            return EtudeResponse.builder()
                    .msg("Etude Crée Avec Succé")
                    .statusCode(200)
                    .build();

        } catch (Exception e){
            return EtudeResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

    public List<EtudeRequest> listDesEtude() {
        List <Etude> etudes = etudeRepository.findAll();
        return etudes.stream().map(Etude::getRequest).collect(Collectors.toList());
    }

    public EtudeResponse deleteEtude(Integer id) {
        try {
            Optional<Etude> etude = etudeRepository.findById(id);
            if(!etude.isPresent()) {
                return EtudeResponse.builder()
                        .error("Etude N'existe Pas")
                        .statusCode(404)
                        .build();
            }
            etudeRepository.deleteById(id);
             return EtudeResponse.builder()
                    .msg("Etude Supprimer Avec Succé")
                    .statusCode(200)
                    .build();
        } catch (Exception e) {
            return EtudeResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

    public EtudeResponse modifierEtude(EtudeRequest request , Integer id) {
        try {
            Optional<Etude> etude = etudeRepository.findById(id);
            if(!etude.isPresent()) {
                return EtudeResponse.builder()
                        .error("Etude N'exist Pas")
                        .statusCode(404)
                        .build();
            }
            Optional<CategorieEtude> categorieEtu = categorieEtudeRepository.findById(request.getCategorie_id().getId());
            if(!categorieEtu.isPresent()) {
                return EtudeResponse.builder()
                        .error("Catégorie Etude N'exist Pas")
                        .statusCode(404)
                        .build();
            }
            Etude edu = etude.get();
            edu.setLibelle(request.getLibelle());
            edu.setDescription(request.getDescription());
            edu.setDurré(request.getDurré());
            edu.setPoint(request.getPoint());
            edu.setCategorieEtude(request.getCategorie_id());
            if(request.getImg()!= null && !request.getImg().isEmpty()) {
                edu.setImg(request.getImg().getBytes());
            }
            etudeRepository.save(edu);
            return EtudeResponse.builder()
                    .msg("Etude Modifier Avec Succcé")
                    .statusCode(200)
                    .build();

        } catch (Exception e) {
            return EtudeResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

}
