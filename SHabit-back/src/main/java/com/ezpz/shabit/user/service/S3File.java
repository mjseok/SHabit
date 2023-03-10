package com.ezpz.shabit.user.service;

import org.springframework.web.multipart.MultipartFile;

public interface S3File {

  String upload(MultipartFile profile, String profile1, String email) throws Exception;

  boolean delete(String filePath);
}
