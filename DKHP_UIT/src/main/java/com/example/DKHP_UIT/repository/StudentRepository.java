package com.example.DKHP_UIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import com.example.DKHP_UIT.entities.Student;
import com.example.DKHP_UIT.response.StudentResponseList;

public interface StudentRepository extends JpaRepository<Student, String> {
    @Query(value = "select st.mssv, st.ten_day_du, st.ten_khoa, st.ten_nganh, st.gioi_tinh from Student st limit 10 offset :from", nativeQuery = true)
    public List<List<String>> getStudentList(int from);
}