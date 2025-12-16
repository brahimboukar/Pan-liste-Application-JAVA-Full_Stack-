package com.example.back_End.controller;

import com.example.back_End.dto.CategorieEtudeRequest;
import com.example.back_End.dto.CategorieEtudeResponse;
import com.example.back_End.dto.EtudeRequest;
import com.example.back_End.dto.EtudeResponse;
import com.example.back_End.service.EtudeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class EtudeController {

    private final EtudeService service;

    @GetMapping("/categorieEtude/list")
    public ResponseEntity <CategorieEtudeResponse> listCategorie() {
        CategorieEtudeResponse response = service.listCategorie();
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @PostMapping("/categorieEtude/create")
    public ResponseEntity<CategorieEtudeResponse> create (@RequestBody CategorieEtudeRequest request) {
        CategorieEtudeResponse response = service.createCategorie(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @DeleteMapping("/categorieEtude/delete/{categorie_id}")
    public ResponseEntity<CategorieEtudeResponse> delete (@PathVariable Integer categorie_id) {
        CategorieEtudeResponse response = service.deteleCategorie(categorie_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @PostMapping(value = "/etude/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EtudeResponse> createEtude(@ModelAttribute EtudeRequest request) {
        EtudeResponse response = service.createEtude(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
    @GetMapping("/etude/list")
    public ResponseEntity<?> listOfEtude() {
        try {
            return ResponseEntity.ok(service.listDesEtude());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/etude/delete/{etude_id}")
    public ResponseEntity<EtudeResponse> deleteEtude(@PathVariable Integer etude_id) {
        EtudeResponse response = service.deleteEtude(etude_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
}
