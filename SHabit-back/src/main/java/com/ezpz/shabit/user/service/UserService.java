package com.ezpz.shabit.user.service;

import com.ezpz.shabit.user.dto.req.UserTestReqDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
  boolean checkEmail(String email) throws Exception;

  ResponseEntity<?> signUp(UserTestReqDto.SignUp signUp);

  ResponseEntity<?> login(UserTestReqDto.Login login);

  ResponseEntity<?> logout(UserTestReqDto.Logout logout);

  ResponseEntity<?> reissue(UserTestReqDto.Reissue reissue);

  ResponseEntity<?> getUserInfo(String email);

}