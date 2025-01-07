package com.example.DKHP_UIT.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.DKHP_UIT.entities.Class;
import com.example.DKHP_UIT.entities.Student;
import com.example.DKHP_UIT.exception.ExceptionCode;
import com.example.DKHP_UIT.exception.ExceptionStudent;
import com.example.DKHP_UIT.mapper.StudentMapper;
import com.example.DKHP_UIT.repository.StudentRepository;
import com.example.DKHP_UIT.request.CreateRegistrationPeriodRequest;
import com.example.DKHP_UIT.request.LoginRequest;
import com.example.DKHP_UIT.request.StudentRequestAdd;
import com.example.DKHP_UIT.request.StudentRequestEdit;
import com.example.DKHP_UIT.request.StudentRequestLogin;
import com.example.DKHP_UIT.response.ResponseCode;
import com.example.DKHP_UIT.response.ResponseDKHP;
import com.example.DKHP_UIT.response.StudentResponse;
import com.example.DKHP_UIT.response.StudentResponseList;
import com.example.DKHP_UIT.support_service.SupportStudentService;
import com.example.DKHP_UIT.utils.UtilsHandleCookie;
import com.example.DKHP_UIT.utils.UtilsHandleEmail;
import com.example.DKHP_UIT.utils.UtilsHandleJwtToken;
import com.example.DKHP_UIT.utils.UtilsHandlePassword;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
import java.util.Date;
import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;

@Service
@Slf4j
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UtilsHandlePassword utilsHandlePassword;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private UtilsHandleEmail utilsHandleEmail;

    @Autowired
    private SupportStudentService supportStudentService;

    @Autowired
    private UtilsHandleJwtToken utilsHandleJwtToken;

    @Autowired
    private UtilsHandleCookie utilsHandleCookie;

    @Autowired
    private RegistrationPeriodService registrationPeriodService;

    public ResponseEntity<Map<String, Object>> login(StudentRequestLogin studentRequestLogin) {
        java.util.Optional<Student> optional = this.studentRepository.findById(studentRequestLogin.getMssv());

        if (optional.isPresent() == false) {
            throw new ExceptionStudent(ExceptionCode.AccountWrong);
        }

        Student student = (Student) optional.get();

        if (utilsHandlePassword.checkPassword(studentRequestLogin.getPassword(), student.getPassword()) == 1) {
            return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.LoginSuccessfully));
        } else {
            throw new ExceptionStudent(ExceptionCode.PasswordWrong);
        }
    }

    public ResponseEntity<Map<String, Object>> createListStudent(List<StudentRequestAdd> list) {
        for (int i = 0; i < list.size(); i++) {
            Student student = this.studentMapper.convertRequestAdd(list.get(i));
            this.studentRepository.save(student);
        }
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateStudentSuccessfully));
    }

    public ResponseEntity<Map<String, Object>> editStudent(StudentRequestEdit studentRequestEdit) {

        // Get sinh viên theo MSSV
        Student student = this.studentRepository.findById(studentRequestEdit.getMssv()).get();

        // Cập nhật thông tin sinh viên từ StudentRequestEdit vào student entity
        this.studentMapper.convertRequestEdit(studentRequestEdit, student);

        // Lưu
        this.studentRepository.save(student);

        // Trả về response thành công
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.EditStudentSuccessfully));
    }

    // Lấy danh sách sinh viên theo trang
    public ResponseEntity getStudent(int page) {

        // Lấy danh sách sinh viên tương ứng với số trang theo phân trang
        List<List<String>> list = this.studentRepository.getStudentList(page * 10);

        // Chuyển đổi danh sách từ List<List<String>> thành List<StudentResponseList>
        List<StudentResponseList> result = StudentResponseList.createListStudentResponseList(list);

        // Trả về response thành công cùng với danh sách sinh viên
        return ResponseEntity.ok().body(result);
    }

    public ResponseEntity<List<StudentResponse>> getAllStudent() {
        List<Student> students = this.studentRepository.findAll();

        List<StudentResponse> studentResponses = students.stream()
                .map(student -> new StudentResponse(
                        student.getMssv(),
                        student.getTenDayDu(),
                        student.getTenKhoa(),
                        student.getTenNganh(),
                        student.getGioiTinh(),
                        student.getPassword() != null && !student.getPassword().equals("")
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(studentResponses);
    }

    public ResponseEntity getDetailStudent(String mssv) {
        Optional<Student> optional = this.studentRepository.findById(mssv);
        Student student = optional.get();
        student.setPassword("");
        return ResponseEntity.ok().body(student);
    }

    public ResponseEntity createStudentAccount(String[] listMSSV, HttpServletResponse response) {
        // for (int i = 0; i < listMSSV.length; i++) {
        // Student student = this.studentRepository.findById(listMSSV[i]).get();

        // String password = supportStudentService.createPassword();
        // student.setPassword(password);
        // this.studentRepository.save(student);

        // this.utilsHandleEmail.sendCreateAccount(student.getEmailCaNhan(), "TÀI KHOẢN
        // MẬT KHẨU - DKHP - UIT",
        // student.getMssv(), password);
        // }
        // return
        // ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateAllAccount));
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        // Ghi phản hồi trực tiếp vào response
        for (String mssv : listMSSV) {
            try {
                // Tìm sinh viên
                Student student = studentRepository.findById(mssv).orElse(null);
                if (student == null) {
                    response.getWriter().write("Không tìm thấy sinh viên với MSSV: " + mssv + "\n");
                    response.getWriter().flush(); // Đẩy dữ liệu về client ngay lập tức
                    continue;
                }

                // Tạo mật khẩu và lưu sinh viên
                String password = supportStudentService.createPassword();
                student.setPassword(password);
                studentRepository.save(student);

                // Gửi email
                utilsHandleEmail.sendCreateAccount(student.getEmailCaNhan(),
                        "TÀI KHOẢN MẬT KHẨU - DKHP - UIT", student.getMssv(), password);

                // Gửi phản hồi về cho client khi một email được gửi thành công
                response.getWriter().write("Gửi thành công email cho: " + student.getEmailCaNhan() + "\n");
                response.getWriter().flush(); // Đẩy dữ liệu ngay

            } catch (Exception e) {
                try {
                    response.getWriter().write("Lỗi khi gửi email cho MSSV: " + mssv + "\n");
                    response.getWriter().flush(); // Đẩy lỗi về client
                } catch (IOException e1) {
                    // TODO Auto-generated catch block
                    e1.printStackTrace();
                }
            }
        }
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateAllAccount));
    }

    public SseEmitter createStudentAccount(String[] listMSSV) {
        SseEmitter emitter = new SseEmitter();

        new Thread(() -> {
            try {
                for (String mssv : listMSSV) {
                    // Tìm sinh viên
                    Student student = studentRepository.findById(mssv).orElse(null);
                    if (student == null) {
                        emitter.send("Không tìm thấy sinh viên với MSSV: " + mssv);
                        continue;
                    }

                    // Tạo mật khẩu và lưu
                    String password = supportStudentService.createPassword();
                    student.setPassword(this.utilsHandlePassword.encryptPassword(password));
                    studentRepository.save(student);

                    // Gửi email
                    utilsHandleEmail.sendCreateAccount(student.getEmailCaNhan(),
                            "TÀI KHOẢN MẬT KHẨU - DKHP - UIT", student.getMssv(), password);

                    // Gửi phản hồi khi email thành công
                    Map<String, String> data = new HashMap<>();
                    data.put("code", "1000");
                    data.put("email", student.getEmailCaNhan());
                    data.put("message", "send email successfully!");
                    emitter.send(data);
                }
                emitter.complete(); // Kết thúc SSE khi hoàn tất
            } catch (Exception e) {
                emitter.completeWithError(e); // Gửi lỗi nếu có
            }
        }).start();

        return emitter;
    }

    public ResponseEntity create1Student(StudentRequestAdd studentRequestAdd) {

        // Get sinh viên theo MSSV
        Optional<Student> st = this.studentRepository.findById(studentRequestAdd.getMssv());

        // Kiểm tra xem sinh viên đã tồn tại chưa
        if (st.isEmpty() == false) {
            throw new ExceptionStudent(ExceptionCode.StudentExist);
        }

        // Chuyển đổi từ StudentRequestAdd sang Student (entity)
        Student student = this.studentMapper.convertRequestAdd(studentRequestAdd);

        // Lưu
        this.studentRepository.save(student);

        // Trả về response
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateStudentSuccessfully));
    }

    public ResponseEntity delete1Student(String mssv) {

        // Get sinh viên theo MSSV
        Student st = this.studentRepository.findById(mssv).get();
        // Xoá sinh viên khỏi database
        this.studentRepository.delete(st);
        // Trả về response
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.DeleteStudent));
    }

    public ResponseEntity deleteListStudent(String[] array) {

        // Duyệt qua danh sách MSSV
        for (int i = 0; i < array.length; i++) {

            // Get sinh viên theo MSSV
            Student st = this.studentRepository.findById(array[i]).get();

            // Xoá sinh viên khỏi database
            this.studentRepository.delete(st);
        }
        // Trả về response thành công
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.DeleteStudent));
    }

    public ResponseEntity login(HttpServletResponse httpServletResponse, LoginRequest loginRequest) {
        // Lấy thông tin sinh viên theo MSSV
        Optional<Student> optional = this.studentRepository.findById(loginRequest.getUserName());

        // Kiểm tra xem sinh viên có tồn tại không
        if (optional.isPresent() == false) {
            // Nếu không tồn tại, ném exception báo lỗi sai tài khoản
            throw new ExceptionStudent(ExceptionCode.AccountWrong);
        }

        // Lấy đối tượng sinh viên từ Optional
        Student student = optional.get();
        // Kiểm tra mật khẩu
        if (this.utilsHandlePassword.checkPassword(loginRequest.getPassword(), student.getPassword()) == 0) {
            throw new ExceptionStudent(ExceptionCode.PasswordWrong);
        }

        // Tạo JWT token
        String token = this.utilsHandleJwtToken.createToken(student);
        // Thiết lập token vào cookie
        this.utilsHandleCookie.setCookie("jwtToken", token, httpServletResponse);
        this.utilsHandleCookie.setCookie("userInfo", student.getMssv(), httpServletResponse);

        Map<String, Object> response = ResponseCode.jsonOfResponseCode(ResponseCode.LoginSuccessfully);
        response.put("role", "Student");
        response.put("flagDKHP", checkRegistrationAvailability(student.getMssv()));

        // Trả về response thành công
        return ResponseEntity.ok()
                .body(response);
    }

    public int checkRegistrationAvailability(String mssv) {
        CreateRegistrationPeriodRequest periodRequest = registrationPeriodService.getRegistrationPeriod();
        if (periodRequest == null) {
            return 1; // Nếu chưa có thời gian đăng ký, cho phép đăng ký
        }
        
         // Lấy 2 số đầu của MSSV
        int studentBatch = Integer.parseInt(mssv.substring(0, 2));

        Date currentDate = new Date();

        if (currentDate.after(periodRequest.getStartDate()) && currentDate.before(periodRequest.getEndDate())) {
              // Kiểm tra thời gian
            LocalTime currentTime = LocalTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
            LocalTime startTime = LocalTime.parse(periodRequest.getStartTime(),formatter);
            LocalTime endTime = LocalTime.parse(periodRequest.getEndTime(),formatter);
    
    
            if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
                System.out.println("Start check time");
               Map<Integer, Integer> allowedBatches = periodRequest.getAllowedBatches();
                for (Map.Entry<Integer, Integer> entry : allowedBatches.entrySet()) {
                    Integer batch = entry.getKey();
                     System.out.println("batch: " + batch); // Log
                    Integer allowedDays = entry.getValue();
                     System.out.println("allowedDays: " + allowedDays); // Log
    
                    if (studentBatch <= batch) { // Check khóa hiện tại của sinh viên
                         long daysBetween = ChronoUnit.DAYS.between(periodRequest.getStartDate().toInstant(), currentDate.toInstant());

    
                         if (daysBetween < allowedDays) {
                            return 1; // Được phép đăng ký
                        }
                    }
                }
            }
        }
        return 0; // Không được phép đăng ký
    }
    public ResponseEntity dkhp(List<String> listClassId, String token) {
        List<String> listTrue = new ArrayList<>();
        List<String> listWrong = new ArrayList<>();
        List<String> listProblem = new ArrayList<>();
        // get userId
        String userId = this.utilsHandleJwtToken.verifyToken(token);

        // System.out.println(userId);
        // return null;

        // get list new classes
        List<Class> newClasses = this.supportStudentService.listNewClasses(listClassId);
        // sort list
        this.supportStudentService.sortList(newClasses);
        // Check siso, schedule, firstSubject, practice and theory of each new class
        // with list registered
        // classes
        // save
        this.supportStudentService.dkhp(newClasses, listWrong, listTrue, listProblem,
                userId);

        ResponseDKHP responseDKHP = ResponseDKHP.builder()
                .listTrue(listTrue)
                .listWrong(listWrong)
                .listProblem(listProblem)
                .code(1000)
                .message("dkhp successfully!")
                .build();
        return ResponseEntity.ok().body(responseDKHP);
    }

    public ResponseEntity undkhp(List<String> listClassId, String token) {
        List<String> listTrue = new ArrayList<>();
        List<String> listWrong = new ArrayList<>();
        List<String> listProblem = new ArrayList<>();
        // get userId
        String userId = this.utilsHandleJwtToken.verifyToken(token);

        // get list registered classes
        List<Class> registeredClasses = this.studentRepository.listRegisteredClass(userId);
       
        // un-register class for student
        this.supportStudentService.undkhp(registeredClasses, listWrong, listTrue, listProblem,
               userId, listClassId);

        ResponseDKHP responseDKHP = ResponseDKHP.builder()
                .listTrue(listTrue)
                .listWrong(listWrong)
                .listProblem(listProblem)
                .code(1000)
                .message("undkhp successfully!")
                .build();
        return ResponseEntity.ok().body(responseDKHP);
    }

     public ResponseEntity getRegisteredClasses(String token) {
        // get userId
        String userId = this.utilsHandleJwtToken.verifyToken(token);
        List<Class> classes = this.studentRepository.listRegisteredClass(userId);
        
        return ResponseEntity.ok().body(classes);
    }
}
