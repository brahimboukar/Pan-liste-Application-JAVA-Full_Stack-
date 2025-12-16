package com.example.back_End.dto;

import com.example.back_End.model.CategorieRecomponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RecomponseRequest {

    private String libelle;
    private int point ;
    private boolean status;

    private CategorieRecomponse categorie_id;


    private Integer id;


    private byte[] byteImg;

    private MultipartFile img;


}
