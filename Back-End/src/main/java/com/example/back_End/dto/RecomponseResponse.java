package com.example.back_End.dto;

import com.example.back_End.model.Recomponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RecomponseResponse {

    private String msg;
    private Recomponse data;
    private int statusCode;
    private String error;


    private String libelle;
    private int point;
    private boolean status;
    private Integer categorie_id;
    private String categorie_libelle;
}
