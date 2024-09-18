package com.example.DKHP_UIT.response;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseCode {

    LoginSuccessfully(1000, "Login successfully!", HttpStatus.ACCEPTED);

    private int code;
    private String message;
    private HttpStatusCode status;

    public static Map<String, Object> jsonOfExceptionCode(ResponseCode exceptionCode) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", exceptionCode.getCode());
        map.put("message", exceptionCode.getMessage());
        return map;
    }
}
