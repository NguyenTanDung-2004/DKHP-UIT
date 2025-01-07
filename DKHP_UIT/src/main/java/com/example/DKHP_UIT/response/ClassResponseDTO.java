package com.example.DKHP_UIT.response;

import java.util.Date;

import lombok.Data;

@Data
public class ClassResponseDTO {
    private String id;
    private String className;
    private Integer siso;
    private Date startDate;
    private Date endDate;
    private Integer tietBatDau;
    private Integer tietKetThuc;
    private Integer thu;
    private Integer flagTH;
    // private String note;
    // private String idLT;
    private Date startDate1;
    private Date endDate1;
    private int sectionOfDay;
    private Integer currentSiSo;
    private RoomDTO room;
    private SubjectDTO subject;
    private GiangVienDTO giangVien;

    @Data
    public static class RoomDTO {
        private String id;
        private String roomName;
    }

    @Data
    public static class SubjectDTO {
        private String id;
        private String maMonHoc;
        private String tenMonHoc;
        private java.util.List<String> dsMaMonHocTruoc;
        private String loaiMonHoc;
        private int soTinChiLT;
        private int soTinChiTH;
        private String maKhoa;
    }

     @Data
    public static class GiangVienDTO {
        private String id;
        private String name;
    }
}
