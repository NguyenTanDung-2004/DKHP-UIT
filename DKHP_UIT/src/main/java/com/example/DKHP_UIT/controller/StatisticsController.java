package com.example.DKHP_UIT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DKHP_UIT.response.AdminStatisticsDTO;
import com.example.DKHP_UIT.response.StaffStatisticsDTO;
import com.example.DKHP_UIT.service.StatisticService;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {
        @Autowired
    private StatisticService statisticService;

    @GetMapping("/staff")
    public ResponseEntity<StaffStatisticsDTO> getStaffStatistics() {
        return new ResponseEntity<>(statisticService.getStaffStatistics(), HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity<AdminStatisticsDTO> getAdminStatistics() {
        return new ResponseEntity<>(statisticService.getAdminStatistics(), HttpStatus.OK);
    }
}
