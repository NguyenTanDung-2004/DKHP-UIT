package com.example.DKHP_UIT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.DKHP_UIT.entities.Subject;
import com.example.DKHP_UIT.exception.ExceptionCode;
import com.example.DKHP_UIT.exception.ExceptionSubject;
import com.example.DKHP_UIT.mapper.SubjectMapper;
import com.example.DKHP_UIT.repository.SubjectRepository;
import com.example.DKHP_UIT.request.RequestDeleteSubjectFromAllSubject;
import com.example.DKHP_UIT.request.SubjectRequest;
import com.example.DKHP_UIT.response.ResponseCode;
import com.example.DKHP_UIT.response.ResponseDeleteSubjectFromAllSubject;
import com.example.DKHP_UIT.support_service.SupportCTDTService;
import com.example.DKHP_UIT.support_service.SupportSubjectService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private SubjectMapper subjectMapper;

    @Autowired
    private SupportCTDTService supportCTDTService;

    @Autowired
    private SupportSubjectService supportSubjectService;

    public ResponseEntity create1Subject(SubjectRequest subjectRequest) {
        // Kiểm tra xem môn học đã tồn tại trong database theo mã môn học
       Subject subject = this.subjectRepository.checkMaMonHoc(subjectRequest.getMaMonHoc());

       // Nếu môn học đã tồn tại, ném ra exception
       if (subject != null) {
           throw new ExceptionSubject(ExceptionCode.SubjectExist);
       }

       // Chuyển đổi SubjectRequest sang Subject entity
       Subject subject1 = this.subjectMapper.convertRequest(subjectRequest);
        // Lưu Subject entity vào database
       this.subjectRepository.save(subject1);

       // Trả về response thành công
       return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateSubjectSuccessfully));
   }

   public ResponseEntity editSubject(SubjectRequest subjectRequest, String id) {
        // kiểm tra mã môn học có tồn tại chưa.
        Subject sub = this.subjectRepository.checkMaMonHocExcludeCurrent(subjectRequest.getMaMonHoc(), id);
        if (sub != null) {
            throw new ExceptionSubject(ExceptionCode.MaMonHocExist);
        }

        Subject subject = this.subjectRepository.findById(id).get();
        Subject subject1 = this.subjectMapper.convertRequest(subjectRequest);
        subject1.setId(subject.getId());
        this.subjectRepository.save(subject1);
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.EditSubject));
    }

   public ResponseEntity createListSubject(List<SubjectRequest> listSubject) {
        // Duyệt qua danh sách các SubjectRequest
        for (int i = 0; i < listSubject.size(); i++) {
            // Chuyển đổi SubjectRequest sang Subject entity
            Subject subject = this.subjectMapper.convertRequest(listSubject.get(i));
            // Lưu Subject entity vào database
            this.subjectRepository.save(subject);
        }
        // Trả về response thành công
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.CreateSubjectSuccessfully));
    }




    public ResponseEntity deleteSubject(String maMonHoc, String maKhoa) {
        Subject subject = this.subjectRepository.checkMaMonHoc(maMonHoc);
        if (this.supportCTDTService.checkSubjectInCTDT(subject.getId(), maKhoa) == false) {
            throw new ExceptionSubject(ExceptionCode.SubjectExistInCTDT);
        }
        this.subjectRepository.delete(subject);
        return ResponseEntity.ok().body(ResponseCode.jsonOfResponseCode(ResponseCode.DeleteSubject));
    }

    public ResponseEntity deleteListSubject(List<RequestDeleteSubjectFromAllSubject> list) {
        List<String> listWrong = new ArrayList<>();
        List<String> listTrue = new ArrayList<>();
        List<String> listProblem = new ArrayList<>();

        for (int i = 0; i < list.size(); i++) {
            Subject subject = this.subjectRepository.findById(list.get(i).getSubjectId()).get();
            // check subject in open subject
            if (this.supportSubjectService.checkOpenSubject(subject) == true) {
                listWrong.add(subject.getId());
                listProblem.add("open subject");
                continue;
            }
            // check ctdt
            else if (this.supportSubjectService.check1SubjectInCTDT(subject.getId()) == true) {
                listWrong.add(subject.getId());
                listProblem.add("ctdt");
                continue;
            }
            // check class
            else if (this.supportSubjectService.checkSubjectClass(subject.getId()) == true) {
                listWrong.add(subject.getId());
                listProblem.add("class");
                continue;
            }
            listTrue.add(subject.getId());
            this.subjectRepository.delete(subject);
        }

        ResponseDeleteSubjectFromAllSubject response = ResponseDeleteSubjectFromAllSubject.builder()
                .code(1000)
                .listTrue(listTrue)
                .listWrong(listWrong)
                .listProblem(listProblem)
                .message("Delete successfully!")
                .build();
        return ResponseEntity.ok().body(response);
    }


    public ResponseEntity getSubject(String maKhoa) {
        return ResponseEntity.ok().body(this.subjectRepository.getSubjectFollowingMaKhoa(maKhoa));
    }


    public List<String> getAllMaMonHoc() {
        List<Subject> subjects = subjectRepository.findAll();
        return subjects.stream()
                .map(Subject::getMaMonHoc)
                .collect(Collectors.toList());
    }

}