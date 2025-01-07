package com.example.DKHP_UIT.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.DKHP_UIT.repository.ClassRepository;
import com.example.DKHP_UIT.repository.GiangVienRepository;
import com.example.DKHP_UIT.repository.OpenSubjectRepository;
import com.example.DKHP_UIT.repository.RoomRepository;
import com.example.DKHP_UIT.repository.StaffRepository;
import com.example.DKHP_UIT.repository.StudentRepository;
import com.example.DKHP_UIT.repository.SubjectRepository;
import com.example.DKHP_UIT.response.AdminStatisticsDTO;
import com.example.DKHP_UIT.response.StaffStatisticsDTO;

@Service
public class StatisticService {
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private OpenSubjectRepository openSubjectRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private GiangVienRepository  giangVienRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StaffRepository staffRepository;

    public StaffStatisticsDTO getStaffStatistics() {
        long totalSubjects = subjectRepository.count();
        long totalOpenSubjects = openSubjectRepository.count();
        List<com.example.DKHP_UIT.entities.Class> listClass = classRepository.findAll();
        long totalFullClasses = listClass.stream().filter(item -> item.getCurrentSiSo() >= item.getSiso()).count();
        long totalNotFullClasses = listClass.stream().filter(item -> item.getCurrentSiSo() < item.getSiso()).count();
        long totalClasses = classRepository.count();
        long totalTeachers = giangVienRepository.count();
        long totalRooms = roomRepository.count();
        long totalStudents = studentRepository.count();

        return new StaffStatisticsDTO(totalSubjects, totalOpenSubjects, totalFullClasses, totalNotFullClasses, totalClasses, totalTeachers, totalRooms, totalStudents);
    }

    public AdminStatisticsDTO getAdminStatistics() {
        long totalStudents = studentRepository.count();
        long totalStaffs = staffRepository.count();
        List<com.example.DKHP_UIT.entities.Class> listClass = classRepository.findAll();
        long totalFullClasses = listClass.stream().filter(item -> item.getCurrentSiSo() >= item.getSiso()).count();
        long totalNotFullClasses = listClass.stream().filter(item -> item.getCurrentSiSo() < item.getSiso()).count();
        long totalClasses = classRepository.count();
        long totalRooms = roomRepository.count();
        long totalTeachers = giangVienRepository.count();

        return new AdminStatisticsDTO(totalStudents, totalStaffs, totalClasses, totalFullClasses, totalNotFullClasses,
                totalRooms, totalTeachers);
    }
}
