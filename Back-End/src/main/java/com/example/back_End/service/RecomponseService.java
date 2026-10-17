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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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


    public CategorieRecomponseResponse listCategorie(int page, int size, boolean all) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<CategorieRecomponse> pageResult = repository.findAll(pageable);
            if (pageResult.isEmpty()) {
                return CategorieRecomponseResponse.builder()
                        .msg("Aucune Catégorie")
                        .statusCode(200)
                        .data(List.of())
                        .currentPage(page)
                        .totalPages(0)
                        .totalElements(0)
                        .pageSize(size)
                        .build();
            }
            if(all) {
                List<CategorieRecomponse> list = repository.findAll(Sort.by("libelle"));
                return CategorieRecomponseResponse.builder()
                        .statusCode(200)
                        .data(list)
                        .currentPage(0)
                        .totalPages(1)
                        .totalElements(list.size())
                        .build();
            }
            return CategorieRecomponseResponse.builder()
                    .statusCode(200)
                    .data(pageResult.getContent())
                    .currentPage(pageResult.getNumber())
                    .totalPages(pageResult.getTotalPages())
                    .totalElements(pageResult.getTotalElements())
                    .pageSize(pageResult.getSize())
                    .build();
        } catch (Exception e) {
            return CategorieRecomponseResponse.builder()
                    .statusCode(500)
                    .error(e.getMessage())
                    .build();
        }
    }


    public boolean libelleAlreadyExists(String libelle) {
        return repository.existsByLibelle(libelle);
    }
    public boolean libelleRecomponseAlreadyExists(String libelle) {
        return recomponseRepository.existsByLibelle(libelle);
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
        try {
            Optional<CategorieRecomponse> cate = repository.findById(id);
            if(!cate.isPresent()){
                return CategorieRecomponseResponse.builder()
                        .statusCode(404)
                        .msg("Catégoris N'éxiste Pas !")
                        .build();
            }
            boolean isCatUsed = recomponseRepository.existsByCategorieRecomponseId(id);
            if(isCatUsed) {
                return CategorieRecomponseResponse.builder()
                        .error("cette catégorie est encore utilisée par une ou plusieurs récompenses")
                        .statusCode(409)
                        .build();
            }
            repository.deleteById(id);
            return CategorieRecomponseResponse.builder()
                    .statusCode(200)
                    .msg("Catégoris Supprimer Avec Succé ")
                    .build();
        } catch (DataIntegrityViolationException e) {
            return CategorieRecomponseResponse.builder()
                    .error("cette catégorie est encore utilisée par une ou plusieurs études")
                    .statusCode(409)
                    .build();
        } catch (Exception e) {
            return CategorieRecomponseResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }

    public CategorieRecomponseResponse modifierCategorieRec(CategorieRecomponseRequest request , Integer id)
    {
        try {
            Optional<CategorieRecomponse> categorieRecomponse = repository.findById(id);
            if(!categorieRecomponse.isPresent()) {
                return CategorieRecomponseResponse.builder()
                        .error("Catégorie Récomponse N'exist Pas")
                        .statusCode(404)
                        .build();
            }
            CategorieRecomponse catRecomponse = categorieRecomponse.get();
            catRecomponse.setLibelle(request.getLibelle());
            repository.save(catRecomponse);
            return CategorieRecomponseResponse.builder()
                    .msg("Catégorie Etude Modifier Avec Succcé")
                    .statusCode(201)
                    .build();
        } catch (Exception e) {
            return CategorieRecomponseResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }



    @Transactional(readOnly = true)
    public Page<RecomponseRequest> listRecomponse(int page, int size, Integer categorieId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        Page<Recomponse> recomponses = (categorieId != null)
                ? recomponseRepository.findByCategorieRecomponseId(categorieId, pageable)
                : recomponseRepository.findAll(pageable);

        return recomponses.map(Recomponse::getRequest);
    }

    public long nbrRecomponse() {
        return recomponseRepository.count();

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
           if(libelleRecomponseAlreadyExists(request.getLibelle())) {
               return RecomponseResponse.builder()
                       .statusCode(422)
                       .error("Recomponse Déja existe")
                       .build();
           }
            Recomponse recomponse = new Recomponse();
            recomponse.setLibelle(request.getLibelle());
            recomponse.setStatus(request.getStatus());
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
            recomponse.setStatus(request.getStatus());
            if (request.getImg() != null && !request.getImg().isEmpty()) {
                recomponse.setImg(request.getImg().getBytes());
            }
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
