package com.example.DKHP_UIT.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.DKHP_UIT.request.LoginRequest;
import com.example.DKHP_UIT.request.StudentRequestAdd;
import com.example.DKHP_UIT.request.StudentRequestEdit;
import com.example.DKHP_UIT.response.StudentResponse;
import com.example.DKHP_UIT.response.StudentResponseList;
import com.example.DKHP_UIT.service.RoleService;
import com.example.DKHP_UIT.service.StudentService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private RoleService roleService;


    // Tạo 1 sinh viên
    @PostMapping("/create1Student")
    public ResponseEntity create1Student(@RequestBody StudentRequestAdd studentRequestAdd) {
        return studentService.create1Student(studentRequestAdd);
    }

    // Tạo 1 list sinh viên
    @PostMapping("/createStudent") 
    public ResponseEntity addStudent(@RequestBody List<StudentRequestAdd> list) {
        return studentService.createListStudent(list);
    }

    @PostMapping("/delete1Student")
    public ResponseEntity delete1Student(@RequestParam(name = "mssv") String mssv) {
        return studentService.delete1Student(mssv);
    }

    @PostMapping("/deleteListStudent")
    public ResponseEntity deleteListStudent(@RequestBody String[] array) {
        return studentService.deleteListStudent(array);
    }


    // API chỉnh sửa
    @PostMapping("/editStudent")
    public ResponseEntity editStudent(@RequestBody StudentRequestEdit studentRequestEdit) {
        return studentService.editStudent(studentRequestEdit);
    }


    // API lấy thông tin chi tiết
    @PostMapping("/getDetailStudent")
    public ResponseEntity getDetailStudent(@RequestParam(name = "mssv") String mssv) {
        return studentService.getDetailStudent(mssv);
    }

    // API lấy ra danh sách sinh viên theo phân trang
    @PostMapping("/getStudent")
    public ResponseEntity getStudent(@RequestParam(name = "page") int page) {
        return studentService.getStudent(page);
    }

    @GetMapping("/getAllStudent")
    public ResponseEntity<List<StudentResponse>> getAllStudent() {
        return studentService.getAllStudent();
    }

    @PostMapping("/closeDKHP")
    public ResponseEntity closeDKHP() {
        return this.roleService.removeDkhpPermission();
    }

    @PostMapping("/openDKHP")
    public ResponseEntity openDKHP() {
        return this.roleService.openDkhpPermission();
    }


    @PostMapping("/createStudentAccount")
    public SseEmitter createStudentAccount(@RequestBody String[] listStudent,
            HttpServletResponse httpServletResponse) {
        return this.studentService.createStudentAccount(listStudent);
    }

    @GetMapping("/stream")
    public SseEmitter stream() {
        SseEmitter emitter = new SseEmitter();

        new Thread(() -> {
            try {
                for (int i = 0; i < 3; i++) {
                    Map<String, String> data = new HashMap<>();
                    data.put("message", "abcd");
                    data.put("count", String.valueOf(i + 1));

                    emitter.send(data); // Send JSON data
                    Thread.sleep(1000);
                }

                // Send complete message
                Map<String, String> completeMessage = new HashMap<>();
                completeMessage.put("message", "complete");
                emitter.send(completeMessage);

                emitter.complete();
            } catch (IOException | InterruptedException e) {
                emitter.completeWithError(e);
            }
        }).start();

        return emitter;
    }

    // API login của sinh viên
    @PostMapping("/login")
    public ResponseEntity login(HttpServletResponse httpServletResponse, @RequestBody LoginRequest loginRequest) {
        return this.studentService.login(httpServletResponse, loginRequest);
    }

    @PostMapping("/dkhp")
    public ResponseEntity dkhp(@RequestParam(name = "token") String token, @RequestBody List<String> listClassId) {
        return this.studentService.dkhp(listClassId, token);
    }

    @PostMapping("/undkhp")
    public ResponseEntity undkhp(@RequestParam(name = "token") String token, @RequestBody List<String> listClassId) {
        return this.studentService.undkhp(listClassId, token);
    }

    @PostMapping("/getRegisteredClasses")
    public ResponseEntity getRegisteredClasses(@RequestParam(name = "token") String token) {
        return this.studentService.getRegisteredClasses(token);
    }
}