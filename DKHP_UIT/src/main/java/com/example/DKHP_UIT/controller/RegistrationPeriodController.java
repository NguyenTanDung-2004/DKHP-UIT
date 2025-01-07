package com.example.DKHP_UIT.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DKHP_UIT.entities.RegistrationPeriod;
import com.example.DKHP_UIT.request.CreateRegistrationPeriodRequest;
import com.example.DKHP_UIT.service.RegistrationPeriodService;

@RestController
@RequestMapping("/registration-periods")
public class RegistrationPeriodController {
    @Autowired
    private RegistrationPeriodService registrationPeriodService;


    @PostMapping("/create")
    public ResponseEntity<List<RegistrationPeriod>> create(@RequestBody CreateRegistrationPeriodRequest request) {
        List<RegistrationPeriod> createdPeriod = this.registrationPeriodService.createRegistrationPeriod(request);
        return new ResponseEntity<>(createdPeriod, HttpStatus.CREATED);
    }

    @PostMapping("/edit")
    public ResponseEntity<List<RegistrationPeriod>> update( @RequestBody CreateRegistrationPeriodRequest request) {
        List<RegistrationPeriod> updatedPeriod = registrationPeriodService.updateRegistrationPeriod( request);
        return ResponseEntity.ok(updatedPeriod);
    }

    @GetMapping
    public ResponseEntity<CreateRegistrationPeriodRequest> get() {
        CreateRegistrationPeriodRequest updatedPeriod = registrationPeriodService.getRegistrationPeriod();
        return ResponseEntity.ok(updatedPeriod);
    }
}