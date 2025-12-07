package com.example.back_End.dto;

import com.example.back_End.model.Fonction;
import com.example.back_End.model.FonctionDeteiller;
import com.example.back_End.model.Region;
import com.example.back_End.model.Sexe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String nom;
    private String prenom;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Sexe getId_sexe() {
        return id_sexe;
    }

    public void setId_sexe(Sexe id_sexe) {
        this.id_sexe = id_sexe;
    }

    public Region getId_region() {
        return id_region;
    }

    public void setId_region(Region id_region) {
        this.id_region = id_region;
    }

    public Fonction getId_fonction() {
        return id_fonction;
    }

    public void setId_fonction(Fonction id_fonction) {
        this.id_fonction = id_fonction;
    }

    public FonctionDeteiller getId_fonction_details() {
        return id_fonction_details;
    }

    public void setId_fonction_details(FonctionDeteiller id_fonction_details) {
        this.id_fonction_details = id_fonction_details;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String email;
    private String telephone;
    private Sexe id_sexe;
    private Region id_region;
    private Fonction id_fonction;
    private FonctionDeteiller id_fonction_details;
    private LocalDate dateNaissance;
    private String password;
}
