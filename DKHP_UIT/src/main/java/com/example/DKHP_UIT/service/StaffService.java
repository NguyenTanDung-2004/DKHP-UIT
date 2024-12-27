package com.example.DKHP_UIT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DKHP_UIT.entities.Staff;
import com.example.DKHP_UIT.entities.Student;
import com.example.DKHP_UIT.exception.ExceptionCode;
import com.example.DKHP_UIT.exception.ExceptionUser;
import com.example.DKHP_UIT.repository.StaffRepository;
import com.example.DKHP_UIT.repository.StudentRepository;
import com.example.DKHP_UIT.response.ResponseCode;
import com.example.DKHP_UIT.support_service.SupportStaffService;
import com.example.DKHP_UIT.utils.UtilsHandleEmail;
import com.example.DKHP_UIT.utils.UtilsHandlePassword;

import java.util.Map;

@Service
public class StaffService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SupportStaffService utilsStaffService;
    @Autowired
    private UtilsHandleEmail utilsHandleEmail;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private UtilsHandlePassword utilsHandlePassword;

    public ResponseEntity<Map<String, Object>> createStudentAccount(String mssv, String email) {
        String password = this.utilsStaffService.createPassword();

        // Gửi password cho người dùng qua email
        this.utilsHandleEmail.sendCreateAccount(email, "TÀI KHOẢN MẬT KHẨU - DKHP - UIT", mssv, password);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateAccountSuccessfully));
    }



    public ResponseEntity login(String email, String password) {
        // Get Staff bằng email
        Staff staff = this.staffRepository.getStaffByEmail(email);
        if (staff == null) {
            throw new ExceptionUser(ExceptionCode.AccountWrong);
        }
        // Kiểm tra mật khẩu
        if (this.utilsHandlePassword.checkPassword(password, staff.getPassword()) == 0) {
            throw new ExceptionUser(ExceptionCode.PasswordWrong);
        }
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.LoginSuccessfully));
    }
}
