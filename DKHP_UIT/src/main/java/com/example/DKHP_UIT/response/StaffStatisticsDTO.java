package com.example.DKHP_UIT.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffStatisticsDTO {
    private long totalSubjects;
    private long totalOpenSubjects;
    private long totalFullClasses;
    private long totalNotFullClasses;
    private long totalClasses;
    private long totalTeachers;
    private long totalRooms;
    private long totalStudents;
}

