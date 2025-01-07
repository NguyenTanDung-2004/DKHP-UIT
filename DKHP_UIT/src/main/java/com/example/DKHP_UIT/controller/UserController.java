package com.example.DKHP_UIT.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DKHP_UIT.entities.Staff;
import com.example.DKHP_UIT.entities.Student;
import com.example.DKHP_UIT.repository.StaffRepository;
import com.example.DKHP_UIT.repository.StudentRepository;
import com.example.DKHP_UIT.request.LoginRequest;
import com.example.DKHP_UIT.request.StudentRequestLogin;
import com.example.DKHP_UIT.service.StaffService;
import com.example.DKHP_UIT.service.StudentService;
import com.example.DKHP_UIT.support_service.SupportAdminService;
import com.example.DKHP_UIT.support_service.SupportStaffService;
import com.example.DKHP_UIT.utils.UtilsHandleEmail;
import com.example.DKHP_UIT.utils.UtilsHandlePassword;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private StaffService staffService;

    @Autowired
    private SupportStaffService SupportStaffService;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SupportAdminService supportAdminService;

    @Autowired
    private UtilsHandlePassword utilsHandlePassword;

    @Autowired
    private UtilsHandleEmail utilsHandleEmail;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody() LoginRequest loginRequest, HttpServletResponse response) {
        // check user
        if (loginRequest.getUserName().contains("staff") || loginRequest.getUserName().contains("admin")) {
            return staffService.login(loginRequest.getUserName(), loginRequest.getPassword(), response);
        } else if (loginRequest.getUserName().contains("staff") == false
                && loginRequest.getUserName().contains("admin") == false) {
            return studentService.login(response, loginRequest);
        } else {
            return ResponseEntity.badRequest().body("Login failed");
        }
    }

    @GetMapping("/reset-password")
    public ResponseEntity sendAuthenCode(@RequestParam(name = "account") String account) {
        // Check staff or admin by email
        Staff staff = staffRepository.getStaffByEmail(account);
        if (staff != null) {
            // create password
            String randomPassword = this.supportAdminService.createPassword();
            // encrypt password
            String encryptedPassword = this.utilsHandlePassword.encryptPassword(randomPassword);
            // save
            staff.setPassword(encryptedPassword);
            this.staffRepository.save(staff);
            // send notification via email.
            String title = "TÀI KHOẢN VÀ MẬT KHẨU CHO NHÂN VIÊN - UIT";
            if (staff.getFlagAdmin() == 1) {
                title = "TÀI KHOẢN VÀ MẬT KHẨU CHO ADMIN - UIT";
            }

            utilsHandleEmail.sendCreateAccount(staff.getEmail(), title,
                    staff.getEmail(), randomPassword);
             return ResponseEntity.ok().body("Reset password success");
        } else {
            // Check student by email
            Optional<Student> optional = studentRepository.findByEmailCaNhan(account);
             if (optional.isEmpty()) {
                return ResponseEntity.badRequest().body("Email not found");
            }
            Student student = optional.get();
            // create password
            String password = this.SupportStaffService.createPassword();
             // encrypt password
              String encryptedPassword = this.utilsHandlePassword.encryptPassword(password);
              student.setPassword(encryptedPassword);
            this.studentRepository.save(student);
            // Gửi password cho người dùng qua email
             this.utilsHandleEmail.sendCreateAccount(student.getEmailCaNhan(), "TÀI KHOẢN MẬT KHẨU - DKHP - UIT",
                    student.getMssv(),
                    password);
            return ResponseEntity.ok().body("Reset password success");
         }
    }
}
