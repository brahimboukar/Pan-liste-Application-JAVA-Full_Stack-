package com.example.back_End.dto;

import com.example.back_End.model.CategorieEtude;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EtudeRequest {

    private Integer id;
    private String libelle;
    private String description;
    private Integer point;
    private Integer durré;
    private CategorieEtude categorie_id;

    private Date created_at;

    private byte[] byteImg;

    private MultipartFile img;

}
