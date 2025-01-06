package com.example.DKHP_UIT.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OpenSubjectResponse {
    private String id;
    private String maMonHoc;
    private String tenMonHoc;
    private List<String> dsMaMonHocTruoc;
    private String loaiMonHoc;
    private int soTinChiLT;
    private int soTinChiTH;
    private String maKhoa;
    private int classCount;
    
}
