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
    LoginFail(1001, "Login fail!", HttpStatus.BAD_REQUEST),
    AccountWrong(1001, "Account wrong", HttpStatus.BAD_REQUEST),
    PasswordWrong(1001, "Password wrong", HttpStatus.BAD_REQUEST),
    SendEmailFail(1001, "Send email fail", HttpStatus.BAD_REQUEST),
    StudentExist(1001, "Student is exist in database!", HttpStatus.BAD_REQUEST),
    SubjectExist(1001, "Subject is exist in database!", HttpStatus.BAD_REQUEST),
    SubjectExistInCTDT(1001, "Subject is exist in CTDT!", HttpStatus.BAD_REQUEST),
    MaMonHocExist(1001, "Ma mon hoc is conflic", HttpStatus.BAD_REQUEST),
    VerificationTokenError(1001, "Verify token error", HttpStatus.BAD_REQUEST),
    TokenCreationError(1001, "Token Creation error", HttpStatus.BAD_REQUEST),
    NotFoundJwtInCookie(1001, "We not found JWT token in your cookie", HttpStatus.BAD_REQUEST);

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
