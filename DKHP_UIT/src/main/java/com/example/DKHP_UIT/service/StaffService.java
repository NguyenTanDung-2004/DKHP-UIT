package com.example.DKHP_UIT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.DKHP_UIT.entities.Staff;
import com.example.DKHP_UIT.entities.Student;
import com.example.DKHP_UIT.exception.ExceptionCode;
import com.example.DKHP_UIT.exception.ExceptionUser;
import com.example.DKHP_UIT.repository.StaffRepository;
import com.example.DKHP_UIT.repository.StudentRepository;
import com.example.DKHP_UIT.response.ResponseCode;
import com.example.DKHP_UIT.response.StaffResponse;
import com.example.DKHP_UIT.support_service.SupportStaffService;
import com.example.DKHP_UIT.utils.UtilsHandleCookie;
import com.example.DKHP_UIT.utils.UtilsHandleEmail;
import com.example.DKHP_UIT.utils.UtilsHandleJwtToken;
import com.example.DKHP_UIT.utils.UtilsHandlePassword;

import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StaffService {
    @Autowired
    private SupportStaffService utilsStaffService;
    @Autowired
    private UtilsHandleEmail utilsHandleEmail;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UtilsHandlePassword utilsHandlePassword;

    @Autowired
    private UtilsHandleCookie utilsHandleCookie;

    public ResponseEntity<Map<String, Object>> createStudentAccount(String mssv, String email) {
        String password = this.utilsStaffService.createPassword();

        // Gửi password cho người dùng qua email
        this.utilsHandleEmail.sendCreateAccount(email, "TÀI KHOẢN MẬT KHẨU - DKHP - UIT", mssv, password);

        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateAccountSuccessfully));
    }

    public ResponseEntity login(String email, String password,
            HttpServletResponse httpServletResponse) {
        // Get Staff bằng account
        Staff staff = this.staffRepository.getStaffByAccount(email);
        if (staff == null) {
            throw new ExceptionUser(ExceptionCode.AccountWrong);
        }
        // Kiểm tra mật khẩu
        if (this.utilsHandlePassword.checkPassword(password, staff.getPassword()) == 0) {
            throw new ExceptionUser(ExceptionCode.PasswordWrong);
        }

        // Tạo JWT token
        String token = this.utilsHandleJwtToken.createToken(staff);
        // Thiết lập token vào cookie
        this.utilsHandleCookie.setCookie("jwtToken", token, httpServletResponse);
        this.utilsHandleCookie.setCookie("userInfo", staff.getId(), httpServletResponse);


        // add role to response
        Map<String, Object> response = ResponseCode.jsonOfResponseCode(ResponseCode.LoginSuccessfully);
        // create role
        String role = "Staff";
        if (staff.getFlagAdmin() == 1) {
            role = "Admin";
        }
        response.put("role", role);

        // Trả về response thành công
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<List<StaffResponse>> getListStaff() {
        List<Staff> staffList = staffRepository.findAll();
        List<StaffResponse> staffResponseList = staffList.stream()
                .map(staff -> new StaffResponse(
                        staff.getId(),
                        staff.getStaffId(),
                        staff.getFullName(),
                        staff.getEmail(),
                        staff.getAccount(),
                        staff.getFlagAdmin()
                ))
                .collect(Collectors.toList());
        return new ResponseEntity<>(staffResponseList, HttpStatus.OK);
    }
    
    public ResponseEntity<Map<String, Object>> deleteListStaff(String[] array) {
        int countDeleted = 0; // Biến đếm số staff đã xóa thành công
        List<String> ids = Arrays.asList(array);
        for (String id : ids) {
            Optional<Staff> optionalStaff = staffRepository.findById(id);
            if (optionalStaff.isPresent()) {
                staffRepository.deleteById(id);
                countDeleted++;
            }
        }
         if(countDeleted>0){
           return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.DeleteStaffSuccess));
        }else{
            throw new ExceptionUser(ExceptionCode.StaffNotFound);        
        }
    }

    public ResponseEntity<Map<String,Object>> editStaff(StaffResponse staffResponse){
        Optional<Staff> optionalStaff = staffRepository.findById(staffResponse.getId());
        if(optionalStaff.isPresent()){
            Staff staffUpdate = optionalStaff.get();
            staffUpdate.setFullName(staffResponse.getFullName());
            staffUpdate.setEmail(staffResponse.getEmail());
            staffUpdate.setAccount(staffResponse.getAccount());
             staffUpdate.setFlagAdmin(staffResponse.getFlagAdmin());
            staffRepository.save(staffUpdate);
            return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.EditStaffSuccess));
        }else {
            throw new ExceptionUser(ExceptionCode.StaffNotFound);   
        }
    }

    public ResponseEntity<String> getStaffName(String id) {
        Optional<Staff> optionalStaff = staffRepository.findById(id);
        if(optionalStaff.isPresent()){
            Staff staff = optionalStaff.get();
            return ResponseEntity.ok().body(staff.getFullName());
        }else {
            throw new ExceptionUser(ExceptionCode.StaffNotFound);   
        }
    }
}
