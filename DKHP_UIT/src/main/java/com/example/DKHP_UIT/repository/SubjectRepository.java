package com.example.DKHP_UIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.DKHP_UIT.entities.Subject;
import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, String> {
    @Query("select sub from Subject sub where sub.maMonHoc = :maMonHoc")
    public Subject checkMaMonHoc(String maMonHoc);

    // get danh sách môn học theo khoa
    @Query("select subject from Subject subject where subject.maKhoa = :maKhoa")
    public List<Subject> getSubjectFollowingMaKhoa(String maKhoa);

    @Query("select sub from Subject sub where sub.maMonHoc = :maMonHoc and sub.id <> :id")
    Subject checkMaMonHocExcludeCurrent(String maMonHoc, String id); // Method mới
}
