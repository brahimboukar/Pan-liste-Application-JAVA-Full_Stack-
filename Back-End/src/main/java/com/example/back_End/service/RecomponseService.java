package com.example.back_End.service;

import com.example.back_End.dto.CategorieRecomponseRequest;
import com.example.back_End.dto.CategorieRecomponseResponse;
import com.example.back_End.dto.RecomponseRequest;
import com.example.back_End.dto.RecomponseResponse;
import com.example.back_End.model.CategorieRecomponse;
import com.example.back_End.model.Recomponse;
import com.example.back_End.repository.CategorieRecomponseRepository;
import com.example.back_End.repository.RecomponseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.File;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecomponseService {


    @Autowired
    private  CategorieRecomponseRepository repository;

    @Autowired
    private RecomponseRepository recomponseRepository;


    public CategorieRecomponseResponse listCategorie() {
        List<CategorieRecomponse> list = repository.findAll();
        if(list.isEmpty()) {
            return CategorieRecomponseResponse.builder()
                    .msg("Aucun Catégorie")
                    .statusCode(200)
                    .build();
        }
        return CategorieRecomponseResponse.builder()
                .statusCode(200)
                .data(list)
                .build();
    }
    public boolean libelleAlreadyExists(String libelle) {
        return repository.existsByLibelle(libelle);
    }


    public CategorieRecomponseResponse createCategorie(@RequestBody CategorieRecomponseRequest request) {
        var cate = CategorieRecomponse.builder()
                .libelle(request.getLibelle())
                .build();
        if(libelleAlreadyExists(request.getLibelle())) {
            return CategorieRecomponseResponse.builder()
                    .error("Catégorie Déja Exists")
                    .statusCode(400)
                    .build();
        }
        repository.save(cate);
        return CategorieRecomponseResponse.builder()
                .statusCode(200)
                .msg("Catégorie Ajouter Avec Succé")
                .build();
    }

    public CategorieRecomponseResponse deleteCategorie(Integer id) {
        Optional<CategorieRecomponse> cate = repository.findById(id);

        if(!cate.isPresent()){
            return CategorieRecomponseResponse.builder()
                    .statusCode(404)
                    .msg("Catégoris N'éxiste Pas !")
                    .build();
        }
        repository.deleteById(id);
         return CategorieRecomponseResponse.builder()
                .statusCode(200)
                .msg("Catégoris Supprimer Avec Succé ")
                .build();
    }



     public List<RecomponseRequest> listRecomponse () {
        List<Recomponse> recomponses = recomponseRepository.findAll();
        return recomponses.stream().map(Recomponse::getRequest).collect(Collectors.toList());
    }


    public RecomponseResponse createRecomponse(RecomponseRequest request){
        try {
           Optional<CategorieRecomponse> cat = repository.findById(request.getCategorie_id().getId());
           if(!cat.isPresent()) {
               return RecomponseResponse.builder()
                       .statusCode(404)
                       .error("Catégorie Recomponse Non Trouvé")
                       .build();
           }
            Recomponse recomponse = new Recomponse();
            recomponse.setLibelle(request.getLibelle());
            recomponse.setStatus(request.isStatus());
            recomponse.setPoint(request.getPoint());
            if (request.getImg() != null && !request.getImg().isEmpty()) {
                recomponse.setImg(request.getImg().getBytes());
            }
            recomponse.setCategorieRecomponse(request.getCategorie_id());

            recomponseRepository.save(recomponse);
            return RecomponseResponse.builder()
                    .statusCode(200)
                    .data(recomponse)
                    .msg("Récomponse Créé Avec Succé")
                    .build();
        }
        catch (Exception e) {
            return RecomponseResponse.builder()
                    .statusCode(500)
                    .error(e.getMessage())
                    .build();
        }

    }
    public RecomponseResponse ChangeIndisponible(Integer id) {
        try {
            Optional<Recomponse> recomponse = recomponseRepository.findById(id);
            if(!recomponse.isPresent()){
                return RecomponseResponse.builder()
                        .error("Recomponse N'est pas Exist")
                        .statusCode(404)
                        .build();
            }
            Recomponse rec = recomponse.get();
            rec.setStatus(false);
            recomponseRepository.save(rec);
            return RecomponseResponse.builder()
                    .msg("Status Changer Avec Succé")
                    .statusCode(200)
                    .build();
        } catch (Exception e) {
            return RecomponseResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }

    }

    public RecomponseResponse Changedisponible(Integer id) {
        try {
            Optional<Recomponse> recomponse = recomponseRepository.findById(id);
            if(!recomponse.isPresent()){
                return RecomponseResponse.builder()
                        .error("Recomponse N'est pas Exist")
                        .statusCode(404)
                        .build();
            }
            Recomponse rec = recomponse.get();
            rec.setStatus(true);
            recomponseRepository.save(rec);
            return RecomponseResponse.builder()
                    .msg("Status Changer Avec Succé")
                    .statusCode(200)
                    .build();
        } catch (Exception e) {
            return RecomponseResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }

    }

    public RecomponseResponse deleteRecomponse (Integer id) {
        try {
            Optional<Recomponse> recomponse = recomponseRepository.findById(id);
            if(!recomponse.isPresent()) {
                return RecomponseResponse.builder()
                        .error("Recomponse Non Trouvé")
                        .statusCode(404)
                        .build();
            }
           recomponseRepository.deleteById(id);
            return RecomponseResponse.builder()
                    .msg("Recomponse Supprimer Avec Succé")
                    .statusCode(200)
                    .build();

        } catch (Exception e) {
            return RecomponseResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

    public RecomponseResponse modifierRecomponse (RecomponseRequest request , Integer id) {
        try {
            Optional<Recomponse> rec = recomponseRepository.findById(id);
            if(!rec.isPresent()) {
                return RecomponseResponse.builder()
                        .error("Récomponse Non Trouvé")
                        .statusCode(404)
                        .build();
            }
            Optional<CategorieRecomponse> catRec = repository.findById(request.getCategorie_id().getId());
            if(!catRec.isPresent()) {
                return RecomponseResponse.builder()
                        .error("Catégorie non trouvée")
                        .statusCode(404)
                        .build();
            }
            Recomponse recomponse = rec.get();
            recomponse.setLibelle(request.getLibelle());
            recomponse.setPoint(request.getPoint());
            recomponse.setCategorieRecomponse(catRec.get());
            recomponse.setImg(request.getImg().getBytes());
            recomponseRepository.save(recomponse);
            return RecomponseResponse.builder()
                    .msg("Récomponse modifier Avec Succé")
                    .statusCode(200)
                    .build();
        } catch (Exception e) {
            return RecomponseResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }
}
