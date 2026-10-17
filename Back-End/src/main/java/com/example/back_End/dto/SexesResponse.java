package com.example.back_End.dto;

import com.example.back_End.model.Sexe;
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
public class SexesResponse {

    private String msg;
    private int statusCode;
    private String error;
    private List<Sexe> data;
}
