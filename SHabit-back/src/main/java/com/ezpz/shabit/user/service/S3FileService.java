package com.ezpz.shabit.user.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3FileService {

  String upload(MultipartFile profile, String profile1) throws Exception;
}
