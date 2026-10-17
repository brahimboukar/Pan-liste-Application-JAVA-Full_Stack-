package com.example.back_End.service;

import com.example.back_End.config.JwtService;
import com.example.back_End.dto.*;
import com.example.back_End.model.Region;
import com.example.back_End.model.Role;
import com.example.back_End.model.Sexe;
import com.example.back_End.model.User;
import com.example.back_End.repository.RegionRepository;
import com.example.back_End.repository.SexeRepository;
import com.example.back_End.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PanélisteService {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final SexeRepository sexeRepository;
    private final RegionRepository regionRepository;


    public boolean emailAlreadyExists(String email) {
        return repository.existsByEmail(email);
    }


    private PanélisteResponse toResponse(User u) {
        return PanélisteResponse.builder()
                .id(u.getId())
                .nom(u.getNom())
                .prenom(u.getPrenom())
                .email(u.getEmail())
                .points(u.getPoints())
                .age(u.getAge())
                .sexe(u.getSexe() != null ? u.getSexe().getLibelle() : null)
                .region(u.getRegion() != null ? u.getRegion().getLibelle() : null)
                .fonction(u.getFonction() != null ? u.getFonction().getLibelle() : null)
                .fonctionDetailler(u.getFonctionDeteiller() != null ? u.getFonctionDeteiller().getLibelle() : null)
                .telephone(u.getTelephone())
                .blocked(u.isBlocked())
                .dateCreation(u.getCreatedAt())
                .build();
    }
    public PanélistePageResponse listPanéliste(int page, int size) {
        try{
            Pageable pageable = PageRequest.of(page,size, Sort.by("createdAt").descending());

            Page<User> pageResult = repository.findByRoleNot(Role.ADMIN,pageable);
            if(pageResult.isEmpty()) {
                return PanélistePageResponse.builder()
                        .msg("Aucun Panéliste")
                        .statusCode(204)
                        .data(List.of())
                        .currentPage(page)
                        .totalPages(0)
                        .totalElements(0)
                        .pageSize(size)
                        .build();
            }
            List<PanélisteResponse> data = pageResult.getContent().stream()
                    .map(this::toResponse)
                    .toList();
            return PanélistePageResponse.builder()
                    .statusCode(200)
                    .data(data)
                    .currentPage(pageResult.getNumber())
                    .totalPages(pageResult.getTotalPages())
                    .totalElements(pageResult.getTotalElements())
                    .pageSize(pageResult.getSize())
                    .build();
        } catch (Exception e) {
            return PanélistePageResponse.builder()
                    .statusCode(500)
                    .error(e.getMessage())
                    .build();
        }
    }
    public SexesResponse listSexeOfPanéliste() {
        try{
            List<Sexe> sexes = sexeRepository.findAll();
            if(sexes.isEmpty()) {
                return SexesResponse.builder()
                        .msg("Lists Sexes Vide")
                        .data(sexes)
                        .statusCode(204)
                        .build();
            }
            return SexesResponse.builder()
                    .data(sexes)
                    .statusCode(200)
                    .build();

        } catch (Exception e) {
            return SexesResponse.builder()
                    .msg(e.getMessage())
                    .statusCode(500)
                    .build();


        }
    }
    public RegionResponse listRegionOfPanéliste() {
        try{
            List<Region> regions = regionRepository.findAll();
            if(regions.isEmpty()) {
                return RegionResponse.builder()
                        .msg("Lists Sexes Vide")
                        .data(regions)
                        .statusCode(204)
                        .build();
            }
            return RegionResponse.builder()
                    .data(regions)
                    .statusCode(200)
                    .build();
        } catch (Exception e) {
            return RegionResponse.builder()
                    .msg(e.getMessage())
                    .statusCode(500)
                    .build();

        }
    }

    public long nbrAllUser() {
        return repository.countByRole(Role.USER);
    }

    /*public AuthenticationResponse createPanélist(RegisterRequest request) {

        try {
            LocalDate dateNaissance = request.getDateNaissance();
            if (dateNaissance == null) {
                return AuthenticationResponse.builder()
                        .statusCode(400)
                        .msg("Date de naissance obligatoire")
                        .build();
            }

            int age = Period.between(dateNaissance, LocalDate.now()).getYears();

            var user = User.builder()
                    .nom(request.getNom())
                    .prenom(request.getPrenom())
                    .email(request.getEmail())
                    .telephone(request.getTelephone())
                    .sexe(request.getId_sexe())
                    .region(request.getId_region())
                    .fonction(request.getId_fonction())
                    .fonctionDeteiller(request.getId_fonction_details())
                    .dateNaissance(dateNaissance)
                    .points(0)
                    .age(age)
                    .blocked(false)
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();

            if (emailAlreadyExists(request.getEmail())) {
                return AuthenticationResponse.builder()
                        .msg("Email Déja Existe")
                        .statusCode(400)
                        .build();
            }

            repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .user(user)
                    .token(jwtToken)
                    .statusCode(200)
                    .msg("Panéliste Créer Avec Succée")
                    .build();
        } catch (Exception e) {
            return AuthenticationResponse.builder()
                    .statusCode(500)
                    .error(e.getMessage())
                    .build();
        }
    } */


    public PanélistePageResponse deletePanéliste(Integer id) {
        Optional<User> user = repository.findById(id);
        if (!user.isPresent()) {
            return PanélistePageResponse.builder()
                    .statusCode(404)
                    .msg("Panéliste N'éxiste Pas ")
                    .build();
        }
        if(user.get().getRole() == Role.ADMIN) {
            return PanélistePageResponse.builder()
                    .statusCode(403)
                    .msg("Vous avez pas cette privilége")
                    .build();
        }
        repository.deleteById(id);
        return PanélistePageResponse.builder()
                .msg("Panéliste Supprimer avec succé")
                .statusCode(200)
                .build();

    }

    /*public PanélisteResponse bloquedPanéliste(Integer id) {
        Optional<User> user= repository.findById(id);
        if (!user.isPresent()) {
            return PanélisteResponse.builder()
                    .statusCode(404)
                    .msg("Panéliste N'ixiste Pas ")
                    .build();
        }
        User userbloque = user.get();
        if(user.get().getRole() == Role.ADMIN) {
            return PanélisteResponse.builder()
                    .statusCode(403)
                    .msg("Vous avez pas cette privilége")
                    .build();
        }
        userbloque.setBlocked(true);
        repository.save(userbloque);
        return PanélisteResponse.builder()
                .statusCode(200)
                .msg("Panéliste bloqué avec succès")
                .build();
    } */

    /*public PanélisteResponse débloquerPanéliste(Integer id) {
        Optional<User> user = repository.findById(id);
        if(!user.isPresent()) {
            return PanélisteResponse.builder()
                    .statusCode(404)
                    .msg("Panéliste N'ixiste Pas ")
                    .build();
        }
        User userdébloque = user.get();
        if(user.get().getRole() == Role.ADMIN) {
            return PanélisteResponse.builder()
                    .statusCode(403)
                    .msg("Vous avez pas cette privilége")
                    .build();
        }
        userdébloque.setBlocked(false);
        repository.save(userdébloque);
        return PanélisteResponse.builder()
                .statusCode(200)
                .msg("Panéliste Débloqué avec succès")
                .build();
    } */

    /*public PanélisteResponse modifierPanéliste(Integer id, RegisterRequest request) {
        Optional<User> user = repository.findById(id);
        if(!user.isPresent()) {
            return PanélisteResponse.builder()
                    .statusCode(404)
                    .msg("Panéliste N'ixiste Pas ")
                    .build();
        }
        User userdébloque = user.get();
        if(user.get().getRole() == Role.ADMIN) {
            return PanélisteResponse.builder()
                    .statusCode(403)
                    .msg("Vous avez pas cette privilége")
                    .build();
        }
        userdébloque.setNom(request.getNom());
        userdébloque.setPrenom(request.getPrenom());
        userdébloque.setTelephone(request.getTelephone());
        userdébloque.setSexe(request.getId_sexe());
        userdébloque.setRegion(request.getId_region());
        userdébloque.setFonction(request.getId_fonction());
        userdébloque.setFonctionDeteiller(request.getId_fonction_details());
        userdébloque.setDateNaissance(request.getDateNaissance());
        userdébloque.setAge(Period.between(request.getDateNaissance(), LocalDate.now()).getYears());
        userdébloque.setPassword(passwordEncoder.encode(request.getPassword()));
        repository.save(userdébloque);
        return PanélisteResponse.builder()
                .statusCode(200)
                .msg("Panéliste Modifier avec succès")
                .build();
    } */




}