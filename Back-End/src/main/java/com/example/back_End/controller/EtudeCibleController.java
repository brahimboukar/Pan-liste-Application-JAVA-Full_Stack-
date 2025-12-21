package com.example.back_End.controller;

import com.example.back_End.dto.EtudeCibleRequest;
import com.example.back_End.dto.EtudeCibleResponse;
import com.example.back_End.service.EtudeCibleService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class EtudeCibleController {

    private final EtudeCibleService service;

    @GetMapping("/etudeCible/list")
    public ResponseEntity<EtudeCibleResponse> gelAll() {
        EtudeCibleResponse response = service.listEtudeCible();
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
    @PostMapping("/etudeCible/ajouter")
    public ResponseEntity<EtudeCibleResponse> ajouter(@RequestBody EtudeCibleRequest request) {
        EtudeCibleResponse response = service.createEtudeCible(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

}
