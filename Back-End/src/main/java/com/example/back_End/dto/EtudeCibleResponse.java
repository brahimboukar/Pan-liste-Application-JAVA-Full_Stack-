package com.example.back_End.dto;


import com.example.back_End.model.Etude;
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
public class EtudeCibleResponse {

    private String msg;
    private List<Etude> data;

    private int statusCode;
    private String error;
}
