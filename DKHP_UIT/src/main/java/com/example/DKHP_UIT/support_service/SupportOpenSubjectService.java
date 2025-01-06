package com.example.DKHP_UIT.support_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.DKHP_UIT.entities.Subject;
import com.example.DKHP_UIT.entities.OpenSubject.OpenSubject;
import com.example.DKHP_UIT.entities.OpenSubject.OpenSubjectId;
import com.example.DKHP_UIT.repository.OpenSubjectRepository;
import com.example.DKHP_UIT.repository.SubjectRepository;
import com.example.DKHP_UIT.response.OpenSubjectResponse;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@Data
public class SupportOpenSubjectService {
    @Value("${app.currentYear}")
    private int currentYear;

    @Value("${app.currentSemester}")
    private int currentSemester;

    @Autowired
    private OpenSubjectRepository openSubjectRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public boolean checkIfSubjectIsExistInListOpenSubject(String subjectId, List<String> listSubject) {
        for (int i = 0; i < listSubject.size(); i++) {
            if (subjectId.equals(listSubject.get(i))) {
                return false;
            }
        }
        return true;
    }

    public List<String> getListSubjectFollowingYearAndSemester() {
        List<String> listSubject = this.openSubjectRepository.getListOpenSubjectWithYearAndSemester(
                currentSemester,
                currentYear);
        return listSubject;
    }

    public List<OpenSubjectResponse> getAllOpenSubject() {
        List<String> listSubjectId = getListSubjectFollowingYearAndSemester();
        List<OpenSubjectResponse> subjectResponses = new ArrayList<>();

        for (String subjectId : listSubjectId) {
            Optional<Subject> optionalSubject = this.subjectRepository.findById(subjectId);
            optionalSubject.ifPresent(subject -> {
            int classCount = this.subjectRepository.countClassesBySubjectId(subjectId);
            OpenSubjectResponse subjectResponse = new OpenSubjectResponse(
                        subject.getId(),
                        subject.getMaMonHoc(),
                        subject.getTenMonHoc(),
                        subject.getDsMaMonHocTruoc(),
                        subject.getLoaiMonHoc(),
                        subject.getSoTinChiLT(),
                        subject.getSoTinChiTH(),
                        subject.getMaKhoa(),
                        classCount
                );
                subjectResponses.add(subjectResponse);
            });
        }
        return subjectResponses;
    }
    
    public void saveOpenSubject(String subjectId, int semester, int year) {
        Subject subject = this.subjectRepository.findById(subjectId).get();
        OpenSubject openSubject = OpenSubject.builder()
                .id(OpenSubjectId.builder()
                        .subject(subject)
                        .hocKy(semester)
                        .nam(year)
                        .build())
                .build();
        this.openSubjectRepository.save(openSubject);
    }

    public void delete1Subject(String subjectId) {
        // get subject
        Subject subject = this.subjectRepository.findById(subjectId).get();
        // get openSubjectId
        OpenSubjectId openSubjectId = OpenSubjectId.builder()
                .hocKy(currentSemester)
                .nam(currentYear)
                .subject(subject)
                .build();
        // get opensubject
        OpenSubject openSubject = this.openSubjectRepository.findById(openSubjectId).get();
        // delete opensubject
        this.openSubjectRepository.delete(openSubject);
    }
}
