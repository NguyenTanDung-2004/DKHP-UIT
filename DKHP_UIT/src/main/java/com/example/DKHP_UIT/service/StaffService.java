package com.example.DKHP_UIT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DKHP_UIT.entities.Student;
import com.example.DKHP_UIT.repository.StudentRepository;
import com.example.DKHP_UIT.response.ResponseCode;
import com.example.DKHP_UIT.support_service.SupportStaffService;
import com.example.DKHP_UIT.utils.UtilsHandleEmail;

import java.util.Map;

@Service
public class StaffService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SupportStaffService utilsStaffService;
    @Autowired
    private UtilsHandleEmail utilsHandleEmail;

    public ResponseEntity<Map<String, Object>> createStudentAccount(String mssv, String email) {
        String password = this.utilsStaffService.createPassword();

        // Student student = (Student) this.studentRepository.findById(mssv).get();
        // student.setPassword(password);

        // this.studentRepository.save(student);
        this.utilsHandleEmail.sendCreateAccount(email, "TÀI KHOẢN MẬT KHẨU - DKHP - UIT", mssv, password);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateAccountSuccessfully));
    }
}
