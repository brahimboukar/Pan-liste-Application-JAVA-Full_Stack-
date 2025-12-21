package com.example.back_End.dto;

import com.example.back_End.model.*;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Set;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EtudeCibleRequest {

    private Integer etude_id;
    private Set<Integer> sexe_id;

    private Set<Integer> region_id;

    public Integer getEtude_id() {
        return etude_id;
    }

    public void setEtude_id(Integer etude_id) {
        this.etude_id = etude_id;
    }

    public Set<Integer> getSexe_id() {
        return sexe_id;
    }

    public void setSexe_id(Set<Integer> sexe_id) {
        this.sexe_id = sexe_id;
    }

    public Set<Integer> getRegion_id() {
        return region_id;
    }

    public void setRegion_id(Set<Integer> region_id) {
        this.region_id = region_id;
    }

    public Set<Integer> getFonction_id() {
        return fonction_id;
    }

    public void setFonction_id(Set<Integer> fonction_id) {
        this.fonction_id = fonction_id;
    }

    public Set<Integer> getFonction_detailler_id() {
        return fonction_detailler_id;
    }

    public void setFonction_detailler_id(Set<Integer> fonction_detailler_id) {
        this.fonction_detailler_id = fonction_detailler_id;
    }

    public Set<Integer> getAge_id() {
        return age_id;
    }

    public void setAge_id(Set<Integer> age_id) {
        this.age_id = age_id;
    }

    private Set<Integer> fonction_id;

    private Set<Integer> fonction_detailler_id;

    private Set<Integer> age_id;


}
