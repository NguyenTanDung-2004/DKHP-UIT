package com.example.DKHP_UIT.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum ExceptionCode {
    LoginFail(1001, "Login fail!", HttpStatus.BAD_REQUEST);

    private int code;
    private String message;
    private HttpStatusCode status;

    public static Map<String, Object> jsonOfExceptionCode(ExceptionCode exceptionCode) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", exceptionCode.getCode());
        map.put("message", exceptionCode.getMessage());
        return map;
    }
}
