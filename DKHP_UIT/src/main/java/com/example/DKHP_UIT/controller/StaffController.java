package com.example.DKHP_UIT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DKHP_UIT.request.SubjectRequest;
import com.example.DKHP_UIT.service.StaffService;

import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;

    // API đăng nhập của staff
    @PostMapping("/login")
    public ResponseEntity login(@RequestParam(name = "email") String email,
            @RequestParam(name = "password") String password, HttpServletResponse response) {
        return staffService.login(email, password, response);
    }

    // API tạo tài khoản
    @PostMapping("/createStudentAccount")
    public ResponseEntity createStudentAccount(@RequestParam(name = "mssv") String mssv,
            @RequestParam(name = "email") String email) {
        return staffService.createStudentAccount(mssv, email);
    }
}
