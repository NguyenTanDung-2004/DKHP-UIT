package com.example.DKHP_UIT.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaffResponse {
    private String id;
    private String staffId;
    private String fullName;
    private String email;
    private String account;
    private Integer flagAdmin;
}
