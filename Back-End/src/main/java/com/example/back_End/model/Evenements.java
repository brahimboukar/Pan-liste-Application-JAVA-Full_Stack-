package com.example.back_End.model;

import com.example.back_End.dto.EvenementRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Evenements {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;

    private String libelle;
    private String description;
    private Date dateDebut;
    private Date dateFin;

    @Lob
    private byte [] img;

    public EvenementRequest request () {
        EvenementRequest request = new EvenementRequest();
        request.setId(id);
        request.setLibelle(libelle);
        request.setDescription(description);
        request.setDateDebut(dateDebut);
        request.setDateFin(dateFin);
        request.setByteImg(img);
        return request;

    }

}
