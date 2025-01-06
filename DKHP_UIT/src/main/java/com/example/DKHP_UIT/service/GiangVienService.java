package com.example.DKHP_UIT.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DKHP_UIT.entities.GiangVien;
import com.example.DKHP_UIT.repository.GiangVienRepository;
import com.example.DKHP_UIT.request.RequestAddGiangVien;
import com.example.DKHP_UIT.response.GiangVienResponse;

@Service
public class GiangVienService {
    @Autowired
    private GiangVienRepository giangVienRepository;

    public ResponseEntity addGiangVien(List<RequestAddGiangVien> listGiangVien) {
        System.out.println(listGiangVien);
        for (int i = 0; i < listGiangVien.size(); i++) {
            // build GiangVien
            GiangVien giangVien = GiangVien.builder()
                    .name(listGiangVien.get(i).getName())
                    .build();
            this.giangVienRepository.save(giangVien);
        }

        return ResponseEntity.ok().body("add giangvien successfully!");
    }

    public ResponseEntity<List<GiangVienResponse>> getListGiangVien() {
        List<GiangVien> giangViens = this.giangVienRepository.findAll();

        List<GiangVienResponse> giangVienResponses = giangViens.stream()
                .map(giangVien -> new GiangVienResponse(giangVien.getId(), giangVien.getName()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(giangVienResponses, HttpStatus.OK);
    }
}
