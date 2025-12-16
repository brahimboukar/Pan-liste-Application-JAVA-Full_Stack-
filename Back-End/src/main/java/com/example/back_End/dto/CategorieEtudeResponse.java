package com.example.back_End.dto;

import com.example.back_End.model.CategorieEtude;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategorieEtudeResponse {

    private String msg;
    private int statusCode;
    private List<CategorieEtude> data;
    private String error;
}
