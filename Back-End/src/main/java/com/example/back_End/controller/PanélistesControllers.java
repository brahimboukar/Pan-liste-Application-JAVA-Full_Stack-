package com.example.back_End.controller;


import com.example.back_End.dto.RecomponseRequest;
import com.example.back_End.dto.RecomponseResponse;
import com.example.back_End.service.PanélistesServices;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class PanélistesControllers {

    private final PanélistesServices services;

    @GetMapping("/recomponse/list")
    public ResponseEntity<?> getAllRecomponse() {
        try {
            return ResponseEntity.ok(services.getAllRecomponse());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @GetMapping("/recomponse/{recomponse_id}")
    public ResponseEntity<?> getRecomponseById(@PathVariable Integer recomponse_id) {
        try {
            if(services.getRecomponseById(recomponse_id).isEmpty()) {
                return ResponseEntity.status(404).body("Recomponse Non Trouvé");
            }
            return ResponseEntity.ok(services.getRecomponseById(recomponse_id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
