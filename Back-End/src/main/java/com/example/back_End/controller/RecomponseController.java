package com.example.back_End.controller;

import com.example.back_End.dto.CategorieRecomponseRequest;
import com.example.back_End.dto.CategorieRecomponseResponse;
import com.example.back_End.dto.RecomponseRequest;
import com.example.back_End.dto.RecomponseResponse;
import com.example.back_End.model.CategorieRecomponse;
import com.example.back_End.repository.CategorieRecomponseRepository;
import com.example.back_End.service.RecomponseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class RecomponseController {

    private final RecomponseService service;

    @GetMapping("/categorieRecomponse/listCategorie")
    public ResponseEntity<CategorieRecomponseResponse> listOfCategorie() {
        CategorieRecomponseResponse response = service.listCategorie();
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @PostMapping("/categorieRecomponse/createCategorieRecomponse")
    public ResponseEntity <CategorieRecomponseResponse> createCategorie(@RequestBody CategorieRecomponseRequest request) {
        CategorieRecomponseResponse response = service.createCategorie(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @DeleteMapping("/categorieRecomponse/deleteCategorie/{cate_id}")
    public ResponseEntity<CategorieRecomponseResponse> deleteCategorie(@PathVariable Integer cate_id) {
        CategorieRecomponseResponse response = service.deleteCategorie(cate_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @GetMapping("/recomponse/listRecomponse")
    public ResponseEntity <List<RecomponseRequest>> gettAllRecomponse() {
        return ResponseEntity.ok(service.listRecomponse());
    }
    @GetMapping("/recomponse/nbrRecomponse")
    public ResponseEntity<?> nbrRecomponse () {
        try {
            return ResponseEntity.status(200).body(service.nbrRecomponse());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping(value = "/recomponse/createRecomponse",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RecomponseResponse> createRecomponse(@ModelAttribute RecomponseRequest request) {
        RecomponseResponse response = service.createRecomponse(request);
           return ResponseEntity.status(response.getStatusCode())
                   .body(response);
    }

    @PutMapping("/recomponse/changeIndisponible/{recomponse_id}")
    public ResponseEntity<RecomponseResponse> changeInsdispo(@PathVariable Integer recomponse_id) {
        RecomponseResponse response = service.ChangeIndisponible(recomponse_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @PutMapping("/recomponse/changeDisponible/{recomponse_id}")
    public ResponseEntity<RecomponseResponse> changeDispo(@PathVariable Integer recomponse_id) {
        RecomponseResponse response = service.Changedisponible(recomponse_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @DeleteMapping("/recomponse/delete/{recomponse_id}")
    public ResponseEntity<RecomponseResponse> deleteRecomponse(@PathVariable Integer recomponse_id) {
        RecomponseResponse response = service.deleteRecomponse(recomponse_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @PutMapping("/recomponse/update/{recomponse_id}")
    public ResponseEntity<RecomponseResponse> updateRecomponse(RecomponseRequest request , @PathVariable Integer recomponse_id) {
        RecomponseResponse response = service.modifierRecomponse(request,recomponse_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
}
