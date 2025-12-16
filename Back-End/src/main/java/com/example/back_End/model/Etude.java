package com.example.back_End.model;

import com.example.back_End.dto.EtudeRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "etude")
public class Etude {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;



    @ManyToOne
    @JoinColumn(name = "categorie_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CategorieEtude categorieEtude;

    private String libelle;
    private String description;
    private Integer durré;
    private Integer point;
    private Date created_at;

    @Lob
    private byte[] img;


    public EtudeRequest getRequest() {
        EtudeRequest etudeRequest = new EtudeRequest();
        etudeRequest.setId(id);
        etudeRequest.setLibelle(libelle);
        etudeRequest.setCategorie_id(categorieEtude);
        etudeRequest.setPoint(point);
        etudeRequest.setByteImg(img);
        etudeRequest.setDescription(description);
        etudeRequest.setDurré(durré);
        etudeRequest.setCreated_at(created_at);
        return etudeRequest;
    }


}
