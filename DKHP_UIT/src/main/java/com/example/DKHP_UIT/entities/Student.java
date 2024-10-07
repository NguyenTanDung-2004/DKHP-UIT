package com.example.DKHP_UIT.entities;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

import com.example.DKHP_UIT.abstract_class.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student extends User {
    @Id
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    @JsonIgnore
    private Role role;
}
