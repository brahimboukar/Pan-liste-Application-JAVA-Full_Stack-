package com.example.back_End.model;

import com.example.back_End.dto.EvenementRequest;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
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

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

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
        request.setCreated_at(createdAt);
        return request;

    }

}
