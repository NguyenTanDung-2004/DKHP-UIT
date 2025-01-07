package com.example.DKHP_UIT.request;

import lombok.Data;
import java.util.Date;
import java.util.Map;

@Data
public class CreateRegistrationPeriodRequest {
    private Date startDate;
    private Date endDate;
    private String startTime;
    private String endTime;
    private Map<Integer, Integer> allowedBatches;
}
