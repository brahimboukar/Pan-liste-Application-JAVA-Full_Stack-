package com.example.back_End.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PanélisteResponse {

    private Integer id;
    private String nom;
    private String prenom;
    private String email;
    private int points;
    private int age;
    private String sexe;
    private String region;
    private String fonction;
    private String fonctionDetailler;
    private String telephone;
    private boolean blocked;
    private LocalDateTime dateCreation;
}