package com.example.back_End.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EvenementRequest {

    private Integer id;
    private String libelle;
    private String description;
    private Date dateDebut;
    private Date dateFin;

    @Lob
    private byte [] byteImg;
    private MultipartFile img;
}
