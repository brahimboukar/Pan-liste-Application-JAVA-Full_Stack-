package com.example.back_End.dto;


import com.example.back_End.model.Evenements;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

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

    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private Date dateDebut;
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private Date dateFin;

}
