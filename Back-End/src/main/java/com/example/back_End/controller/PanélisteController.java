package com.example.back_End.controller;

import com.example.back_End.dto.*;
import com.example.back_End.model.Role;
import com.example.back_End.model.User;
import com.example.back_End.repository.UserRepository;
import com.example.back_End.service.AuthenticationService;
import com.example.back_End.service.PanélisteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class PanélisteController {

    private final PanélisteService panélisteService;
    private final UserRepository userRepository;

    @GetMapping("/panélistes/list")
    public ResponseEntity<PanélistePageResponse> getAllPanélistes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
       PanélistePageResponse response = panélisteService.listPanéliste(page,size);
       return ResponseEntity.status(response.getStatusCode())
               .body(response);
    }
    @GetMapping("/panélistes/sexes")
    public ResponseEntity<SexesResponse> getAllSexes() {
        SexesResponse response = panélisteService.listSexeOfPanéliste();
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
    @GetMapping("/panélistes/region")
    public ResponseEntity<RegionResponse> getAllRegions() {
        RegionResponse response = panélisteService.listRegionOfPanéliste();
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }


   /* @GetMapping("/nbrPaneliste")
    public ResponseEntity<?> nbrUsers() {
        try {
            return ResponseEntity.status(200).body(panélisteService.nbrAllUser());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @GetMapping("/currentUser")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            return ResponseEntity.status(200).body(
                    Map.of(
                            "nom", user.getNom(),
                            "prenom", user.getPrenom()
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Vous Connecter");
        }

    }

    @PostMapping("/createPanéliste")
    public ResponseEntity<AuthenticationResponse> createPanéliste (@RequestBody RegisterRequest request) {
        AuthenticationResponse response = panélisteService.createPanélist(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    } */

    @DeleteMapping("/panéliste/delete/{user_id}")
    public ResponseEntity<PanélistePageResponse> deletePanéliste(@PathVariable Integer user_id){
        PanélistePageResponse response = panélisteService.deletePanéliste(user_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
    /*
    @PutMapping("/block/{user_Id}")
    public ResponseEntity<PanélisteResponse> blockedPanéliste(@PathVariable Integer user_Id){
        PanélisteResponse response = panélisteService.bloquedPanéliste(user_Id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @PutMapping("/déblock/{user_Id}")
    public ResponseEntity<PanélisteResponse> déblockedPanéliste(@PathVariable Integer user_Id){
        PanélisteResponse response = panélisteService.débloquerPanéliste(user_Id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @PutMapping("/updatePanéliste/{user_Id}")
    public ResponseEntity<PanélisteResponse> modifierPanéliste(@PathVariable Integer user_Id,@RequestBody RegisterRequest request) {
        PanélisteResponse response = panélisteService.modifierPanéliste(user_Id , request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    */

}
