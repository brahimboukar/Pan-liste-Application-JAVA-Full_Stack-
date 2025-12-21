package com.example.back_End.service;

import com.example.back_End.dto.RecomponseRequest;
import com.example.back_End.dto.RecomponseResponse;
import com.example.back_End.model.Recomponse;
import com.example.back_End.repository.RecomponseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PanélistesServices {

    private final RecomponseRepository recomponseRepository;

    public List<RecomponseRequest> getAllRecomponse() {
        List<Recomponse> recomponses = recomponseRepository.findAll();
        return recomponses.stream().map(Recomponse::getRequest).collect(Collectors.toList());
    }

    public List<RecomponseRequest> getRecomponseById(Integer id) {
        Optional<Recomponse> recomponses = recomponseRepository.findById(id);
        return recomponses.stream().map(Recomponse::getRequest).collect(Collectors.toList());
    }
}
