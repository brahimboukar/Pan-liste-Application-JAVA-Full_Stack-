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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public CategorieEtudeResponse listCategorie(int page , int size ,boolean all) {
        try {
            Pageable pageable = PageRequest.of(page , size , Sort.by("createdAt").descending());

            Page<CategorieEtude> pageResult = categorieEtudeRepository.findAll(pageable);
            if(pageResult.isEmpty()) {
                return CategorieEtudeResponse.builder()
                        .msg("Aucun Catégorie ")
                        .data(List.of())
                        .currentPage(page)
                        .totalPages(0)
                        .totalElements(0)
                        .pageSize(size)
                        .build();
            }
            if(all) {
                List <CategorieEtude> list = categorieEtudeRepository.findAll(Sort.by("libelle"));
                return CategorieEtudeResponse.builder()
                        .msg("Liste Des Categorie Etude : ")
                        .statusCode(200)
                        .data(list)
                        .currentPage(0)
                        .totalPages(1)
                        .totalElements(list.size())
                        .build();
            }
            return CategorieEtudeResponse.builder()
                    .msg("Liste Des Categorie Etude : ")
                    .statusCode(200)
                    .data(pageResult.getContent())
                    .currentPage(pageResult.getNumber())
                    .totalPages(pageResult.getTotalPages())
                    .totalElements(pageResult.getTotalElements())
                    .pageSize(pageResult.getSize())
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
            boolean isCatUsed = etudeRepository.existsByCategorieEtudeId(id);
            if(isCatUsed) {
                return CategorieEtudeResponse.builder()
                        .error("cette catégorie est encore utilisée par une ou plusieurs études")
                        .statusCode(409)
                        .build();
            }
            categorieEtudeRepository.deleteById(id);
            return CategorieEtudeResponse.builder()
                    .msg("Catégorie Supprimer  Avec Succé")
                    .statusCode(200)
                    .build();

        } catch (DataIntegrityViolationException e) {
            return CategorieEtudeResponse.builder()
                    .error("cette catégorie est encore utilisée par une ou plusieurs études")
                    .statusCode(409)
                    .build();
        } catch (Exception e) {
            return CategorieEtudeResponse.builder()
                    .error(e.getMessage())
                    .statusCode(500)
                    .build();
        }
    }
    public CategorieEtudeResponse modifierCatEtude(CategorieEtudeRequest request , Integer id) {
        try{
            Optional<CategorieEtude> categorieEtude = categorieEtudeRepository.findById(id);;
            if(!categorieEtude.isPresent()) {
                return CategorieEtudeResponse.builder()
                        .error("Catégorie Etude N'exist Pas")
                        .statusCode(404)
                        .build();
            }
            CategorieEtude catEtude = categorieEtude.get();
            catEtude.setLibelle(request.getLibelle());
            categorieEtudeRepository.save(catEtude);
            return CategorieEtudeResponse.builder()
                    .msg("Catégorie Etude Modifier Avec Succcé")
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

    @Transactional(readOnly = true)
    public Page<EtudeRequest> listDesEtude(int page , int size , Integer categorieId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page <Etude> etudes = (categorieId!=null)
                ?etudeRepository.findByCategorieEtudeId(categorieId,pageable)
                : etudeRepository.findAll(pageable);
        return etudes.map(Etude::getRequest);
    }

    public long nbrEtude() {
        return etudeRepository.count();
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
