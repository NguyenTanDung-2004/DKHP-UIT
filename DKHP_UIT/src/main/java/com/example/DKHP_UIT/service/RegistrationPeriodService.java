package com.example.DKHP_UIT.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.DKHP_UIT.entities.RegistrationPeriod;
import com.example.DKHP_UIT.repository.RegistrationPeriodRepository;
import com.example.DKHP_UIT.request.CreateRegistrationPeriodRequest;

@Service
public class RegistrationPeriodService {
    @Autowired
    private RegistrationPeriodRepository registrationPeriodRepository;

    public CreateRegistrationPeriodRequest getRegistrationPeriod(){
        List<RegistrationPeriod> registrationPeriods = registrationPeriodRepository.findAll();
         if(registrationPeriods.isEmpty()){
             return null; // không có dữ liệu trả về null
         }

        RegistrationPeriod period = registrationPeriods.get(0);
        CreateRegistrationPeriodRequest request = new CreateRegistrationPeriodRequest();
        request.setStartDate(period.getStartDate());
        request.setEndDate(period.getEndDate());
        request.setStartTime(period.getStartTime());
        request.setEndTime(period.getEndTime());
        request.setAllowedBatches(period.getAllowedBatches());

        return request;
    }
     public List<RegistrationPeriod> createRegistrationPeriod(CreateRegistrationPeriodRequest request) {
        // Xóa tất cả bản ghi cũ (nếu có)
        registrationPeriodRepository.deleteAll();

        RegistrationPeriod period = new RegistrationPeriod();
        period.setStartDate(request.getStartDate());
        period.setEndDate(request.getEndDate());
        period.setStartTime(request.getStartTime());
        period.setEndTime(request.getEndTime());
        period.setAllowedBatches(request.getAllowedBatches());

        registrationPeriodRepository.save(period);

        return registrationPeriodRepository.findAll(); // trả về danh sách bản ghi sau khi tạo
    }


    public List<RegistrationPeriod> updateRegistrationPeriod( CreateRegistrationPeriodRequest request) {
        // Xóa tất cả bản ghi cũ (nếu có)
        registrationPeriodRepository.deleteAll();

         RegistrationPeriod period = new RegistrationPeriod();
        period.setStartDate(request.getStartDate());
        period.setEndDate(request.getEndDate());
        period.setStartTime(request.getStartTime());
        period.setEndTime(request.getEndTime());
        period.setAllowedBatches(request.getAllowedBatches());


        registrationPeriodRepository.save(period);
        return registrationPeriodRepository.findAll(); // trả về danh sách bản ghi sau khi update
    }

}