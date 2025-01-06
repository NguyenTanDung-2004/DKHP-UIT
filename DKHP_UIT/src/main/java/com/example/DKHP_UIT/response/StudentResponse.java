package com.example.DKHP_UIT.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {
    private String mssv;
    private String tenDayDu;
    private String tenKhoa;
    private String tenNganh;
    private String gioiTinh;
    private boolean isActived;
}