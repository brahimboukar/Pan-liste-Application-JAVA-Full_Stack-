package com.example.back_End.service;


import com.example.back_End.config.JwtService;
import com.example.back_End.dto.AuthenticationResponse;
import com.example.back_End.dto.LoginRequest;
import com.example.back_End.dto.RegisterRequest;
import com.example.back_End.model.Role;
import com.example.back_End.model.User;
import com.example.back_End.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public boolean emailAlreadyExists(String email){
        return repository.existsByEmail(email);
    }
    public AuthenticationResponse register(RegisterRequest request) {
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
            if(emailAlreadyExists(request.getEmail())){
                return AuthenticationResponse.builder()
                        .error("Email Déja Existe")
                        .statusCode(400)
                        .build();
            }
            User userResult = repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .user(user)
                    .token(jwtToken)
                    .statusCode(200)
                    .msg("Votre Compte Crée Avec Succée")
                    .build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (LockedException e) {
            return AuthenticationResponse.builder()
                    .error("Vous êtes bloqué, contactez le support")
                    .statusCode(403)
                    .build();
        } catch (BadCredentialsException e) {
            return AuthenticationResponse.builder()
                    .error("Email ou mot de passe incorrect")
                    .statusCode(401)
                    .build();
        }

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .statusCode(200)
                .msg("Vous avez Connecter Succé")
                .build();
    }

    // création compte pour Admin
    public AuthenticationResponse createAdmin(RegisterRequest request) {
        var user = User.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .telephone(null)
                .sexe(null)
                .region(null)
                .fonction(null)
                .fonctionDeteiller(null)
                .dateNaissance(null)
                .points(0)
                .age(0)
                .blocked(false)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();
        if(emailAlreadyExists(request.getEmail())){
            return AuthenticationResponse.builder()
                    .error("Email Déja Existe")
                    .statusCode(400)
                    .build();
        }
        User userResult = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .user(user)
                .token(jwtToken)
                .statusCode(200)
                .msg("Votre Compte ADMIN Crée Avec Succée")
                .build();
    }

}
