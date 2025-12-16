package com.example.back_End.service;

import com.example.back_End.config.JwtService;
import com.example.back_End.dto.AuthenticationResponse;
import com.example.back_End.dto.PanélisteResponse;
import com.example.back_End.dto.RegisterRequest;
import com.example.back_End.model.Role;
import com.example.back_End.model.User;
import com.example.back_End.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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



    public boolean emailAlreadyExists(String email) {
        return repository.existsByEmail(email);
    }


    public List<User> getAllPanéliste() {
        List<User> result = repository.findAll();
        List<User> filterUser = result.stream()
                .filter(user -> user.getRole() != Role.ADMIN)
                .toList();
        return filterUser;
    }

    public AuthenticationResponse createPanélist(RegisterRequest request) {
        var user = User.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .telephone(request.getTelephone())
                .sexe(request.getId_sexe())
                .region(request.getId_region())
                .fonction(request.getId_fonction())
                .fonctionDeteiller(request.getId_fonction_details())
                .dateNaissance(request.getDateNaissance())
                .points(0)
                .age(Period.between(request.getDateNaissance(), LocalDate.now()).getYears())
                .blocked(false)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        if (emailAlreadyExists(request.getEmail())) {
            return AuthenticationResponse.builder()
                    .error("Email Déja Existe")
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
    }

    public PanélisteResponse deletePanéliste(Integer id) {
        Optional<User> user = repository.findById(id);
        if (!user.isPresent()) {
            return PanélisteResponse.builder()
                    .statusCode(404)
                    .msg("Panéliste N'éxiste Pas ")
                    .build();
        }
        if(user.get().getRole() == Role.ADMIN) {
            return PanélisteResponse.builder()
                    .statusCode(403)
                    .msg("Vous avez pas cette privilége")
                    .build();
        }
        repository.deleteById(id);
        return PanélisteResponse.builder()
                .msg("Panéliste Supprimer avec succé")
                .statusCode(200)
                .build();

    }

    public PanélisteResponse bloquedPanéliste(Integer id) {
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
    }

    public PanélisteResponse débloquerPanéliste(Integer id) {
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
    }

    public PanélisteResponse modifierPanéliste(Integer id, RegisterRequest request) {
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
    }




}