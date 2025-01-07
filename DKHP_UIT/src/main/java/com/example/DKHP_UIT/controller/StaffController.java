package com.example.DKHP_UIT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.DKHP_UIT.entities.Staff;
import com.example.DKHP_UIT.request.SubjectRequest;
import com.example.DKHP_UIT.response.StaffResponse;
import com.example.DKHP_UIT.service.StaffService;

import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Map;

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

    // API lấy danh sách tất cả staff
    @GetMapping("/list")
    public ResponseEntity<List<StaffResponse>> getListStaff() {
        return staffService.getListStaff();
    }

    // API lấy danh sách tất cả staff
    @GetMapping("/name")
    public ResponseEntity<String> getStaffName(@RequestParam(name = "id") String id) {
        return staffService.getStaffName(id);
    }
    
    // API xoá danh sách staff theo id
    @PostMapping("/deleteList")
    public ResponseEntity<Map<String,Object>> deleteListStaff(@RequestBody String[] array){
        return staffService.deleteListStaff(array);
    }

    // API chỉnh sửa thông tin staff
    @PostMapping("/edit")
    public ResponseEntity<Map<String,Object>> editStaff(@RequestBody StaffResponse staffResponse){
         return staffService.editStaff(staffResponse);
    }
}
