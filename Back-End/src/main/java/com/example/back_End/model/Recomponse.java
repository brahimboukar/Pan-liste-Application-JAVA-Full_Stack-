package com.example.back_End.model;

import com.example.back_End.dto.RecomponseRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Blob;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "recomponses")
public class Recomponse {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private CategorieRecomponse categorieRecomponse;



    private String libelle;


    private int point ;
    private boolean status;

    @Lob
    private byte[] img;


    public RecomponseRequest getRequest() {
        RecomponseRequest recomponseRequest = new RecomponseRequest();
        recomponseRequest.setId(id);
        recomponseRequest.setLibelle(libelle);
        recomponseRequest.setStatus(status);
        recomponseRequest.setPoint(point);
        recomponseRequest.setByteImg(img);
        recomponseRequest.setCategorie_id(categorieRecomponse);
        return recomponseRequest;

    }





}
