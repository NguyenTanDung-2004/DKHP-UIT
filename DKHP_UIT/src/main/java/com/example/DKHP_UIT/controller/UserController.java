package com.example.DKHP_UIT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DKHP_UIT.request.LoginRequest;
import com.example.DKHP_UIT.request.StudentRequestLogin;
import com.example.DKHP_UIT.service.StaffService;
import com.example.DKHP_UIT.service.StudentService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private StaffService staffService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody() LoginRequest loginRequest, HttpServletResponse response) {
        // check user
        if (loginRequest.getUserName().contains("staff") || loginRequest.getUserName().equals("admin")) {
            return staffService.login(loginRequest.getUserName(), loginRequest.getPassword(), response);
        } else if (loginRequest.getUserName().contains("staff") == false
                && loginRequest.getUserName().contains("admin") == false) {
            return studentService.login(response, loginRequest);
        } else {
            return ResponseEntity.badRequest().body("Login failed");
        }
    }
}
