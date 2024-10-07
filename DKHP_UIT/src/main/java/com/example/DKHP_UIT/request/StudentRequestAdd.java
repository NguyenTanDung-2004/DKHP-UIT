package com.example.DKHP_UIT.request;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentRequestAdd {
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
