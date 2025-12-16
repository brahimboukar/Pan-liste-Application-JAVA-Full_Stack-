package com.example.back_End.dto;

import com.example.back_End.model.CategorieEtude;
import com.example.back_End.model.Etude;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EtudeResponse {

    private String msg;
    private Etude data;
    private int statusCode;
    private String error;

    private String libelle;
    private String description;
    private Integer point;
    private Integer durré;
    private CategorieEtude categorie_id;


}
