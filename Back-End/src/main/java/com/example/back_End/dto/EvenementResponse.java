package com.example.back_End.dto;


import com.example.back_End.model.Evenements;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EvenementResponse {

    private String msg;
    private Evenements data;
    private int statusCode;
    private String error;

    private String libelle;
    private String description;
    private Date dateDebut;
    private Date dateFin;

}
