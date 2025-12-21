package com.example.back_End.controller;


import com.example.back_End.dto.EvenementRequest;
import com.example.back_End.dto.EvenementResponse;
import com.example.back_End.service.EvenementService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class EvenementController {

    private final EvenementService service;

    @GetMapping("/evenement/list")
    public ResponseEntity<?> list() {
        try {
            return ResponseEntity.ok(service.listDesEvenement());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping(value = "/evenement/ajouter",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EvenementResponse> ajouter(@ModelAttribute EvenementRequest request) {
        EvenementResponse response = service.ajouterEvenement(request);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @DeleteMapping("/evenement/delete/{evenement_id}")
    public ResponseEntity<EvenementResponse> supprimer(@PathVariable Integer evenement_id) {
        EvenementResponse response = service.supprimerEvenment(evenement_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }

    @PutMapping("/evenement/update/{evenement_id}")
    public ResponseEntity <EvenementResponse> modifier(
            @ModelAttribute EvenementRequest request,
            @PathVariable Integer evenement_id
    ) {
        EvenementResponse response = service.modifierEvenement(request,evenement_id);
        return ResponseEntity.status(response.getStatusCode())
                .body(response);
    }
}
