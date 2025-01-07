package com.example.DKHP_UIT.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatisticsDTO {
    private long totalStudents;
    private long totalStaffs;
    private long totalClasses;
    private long totalFullClasses;
    private long totalNotFullClasses;
    private long totalRooms;
    private long totalTeachers;
}
