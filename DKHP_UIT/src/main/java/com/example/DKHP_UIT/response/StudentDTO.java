package com.example.DKHP_UIT.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
    private String mssv;
    private String tenDayDu;
    private String tenKhoa;
    private String tenNganh;
    private String diaChiChiTiet;
    private String tinh_thanhPho;
    private String quan_huyen;
    private String xa_phuong;
    private String gioiTinh;
    private String noiSinh;
    private String diaChiChiTiet1;
    private String tinh_thanhPho1;
    private String quan_huyen1;
    private String xa_phuong1;
    private Date ngaySinh;
    private String cmnd;
    private String emailCaNhan;
    private String password;
}
