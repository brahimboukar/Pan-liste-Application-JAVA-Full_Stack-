package com.example.back_End.model;

import com.example.back_End.dto.EtudeRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany
    @JoinTable(
            name = "etude_sexe",
            joinColumns = @JoinColumn(name = "etude_id"),
            inverseJoinColumns = @JoinColumn(name = "sexe_id")
    )
    private Set<Sexe> sexes = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "etude_region",
            joinColumns = @JoinColumn(name = "etude_id"),
            inverseJoinColumns = @JoinColumn(name = "region_id")
    )
    private Set<Region> regions = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "etude_fonction",
            joinColumns = @JoinColumn(name = "etude_id"),
            inverseJoinColumns = @JoinColumn(name = "fonction_id")
    )
    private Set<Fonction> fonctions = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "etude_fonction_detailler",
            joinColumns = @JoinColumn(name = "etude_id"),
            inverseJoinColumns = @JoinColumn(name = "fonction_detailler_id")
    )
    private Set<FonctionDeteiller> fonctionDeteillers = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "etude_age",
            joinColumns = @JoinColumn(name = "etude_id"),
            inverseJoinColumns = @JoinColumn(name = "age_id")
    )
    private Set<Age> ages = new HashSet<>();

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
