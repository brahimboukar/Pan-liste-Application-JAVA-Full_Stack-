package com.example.back_End.controller;

import com.example.back_End.dto.AuthenticationResponse;
import com.example.back_End.dto.LoginRequest;
import com.example.back_End.dto.RegisterRequest;
import com.example.back_End.model.Fonction;
import com.example.back_End.model.FonctionDeteiller;
import com.example.back_End.model.Region;
import com.example.back_End.model.Sexe;
import com.example.back_End.repository.FonctionDétaillerRepository;
import com.example.back_End.repository.FonctionRepository;
import com.example.back_End.repository.RegionRepository;
import com.example.back_End.repository.SexeRepository;
import com.example.back_End.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final SexeRepository sexeRepository;
    private final RegionRepository regionRepository;
    private final FonctionRepository fonctionRepository;
    private final FonctionDétaillerRepository fonctionDétaillerRepository;



    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (@RequestBody RegisterRequest request) {
        AuthenticationResponse response = service.register(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login (@RequestBody LoginRequest request) {
        AuthenticationResponse response = service.login(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
    //création Compte Pour ADMIN

    @PostMapping("/creatAdmin")
    public ResponseEntity<AuthenticationResponse> createAdmin (@RequestBody RegisterRequest request) {
        AuthenticationResponse response = service.createAdmin(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }


    @GetMapping("/sexe")
    public List<Sexe> sexeList() {
        return sexeRepository.findAll();
    }

    @GetMapping("/region")
    public List<Region> regionList() {
        return regionRepository.findAll();
    }

    @GetMapping("/fonction")
    public List<Fonction> fonctionList() {
        return fonctionRepository.findAll();
    }

    @GetMapping("/fonctionDétailler/{fonction_Id}")
    public List<FonctionDeteiller> fonctionDétaillerList(@PathVariable Long fonction_Id) {
        return fonctionDétaillerRepository.findByFonctionId(fonction_Id);
    }

}
