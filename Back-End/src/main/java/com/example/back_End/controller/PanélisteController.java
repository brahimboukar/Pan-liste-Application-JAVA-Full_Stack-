package com.example.back_End.controller;

import com.example.back_End.dto.AuthenticationResponse;
import com.example.back_End.dto.PanélisteResponse;
import com.example.back_End.dto.RegisterRequest;
import com.example.back_End.model.Role;
import com.example.back_End.model.User;
import com.example.back_End.repository.UserRepository;
import com.example.back_End.service.AuthenticationService;
import com.example.back_End.service.PanélisteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class PanélisteController {

    private final PanélisteService panélisteService;
    private final UserRepository userRepository;

    @GetMapping("/panélistes")
    public ResponseEntity<?> getAllPanélistes() {
        List<User> users = panélisteService.getAllPanéliste();
        if(users.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NO_CONTENT)

                    .body("Liste Des Panéliste est vide");
        }
        return ResponseEntity.ok(users);
    }

    @PostMapping("/createPanéliste")
    public ResponseEntity<AuthenticationResponse> createPanéliste (@RequestBody RegisterRequest request) {
        AuthenticationResponse response = panélisteService.createPanélist(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @DeleteMapping("/delete/{user_id}")
    public ResponseEntity<PanélisteResponse> deletePanéliste(@PathVariable Integer user_id){
        PanélisteResponse response = panélisteService.deletePanéliste(user_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
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

}
