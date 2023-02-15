package com.ezpz.shabit.config.oauth.service;

import com.ezpz.shabit.config.oauth.entity.ProviderType;
import com.ezpz.shabit.config.oauth.entity.UserPrincipal;
import com.ezpz.shabit.config.oauth.exception.OAuthProviderMissMatchException;
import com.ezpz.shabit.config.oauth.info.OAuth2UserInfo;
import com.ezpz.shabit.config.oauth.info.OAuth2UserInfoFactory;
import com.ezpz.shabit.user.entity.Users;
import com.ezpz.shabit.user.enums.Authority;
import com.ezpz.shabit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private static final String ALREADY_SIGNED_UP_SOCIAL = "already_signed_up_social";
	private static final String ALREADY_SIGNED_UP_LOCAL = "already_signed_up_local";

	private final UserRepository userRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user = super.loadUser(userRequest);

		try {
			return this.process(userRequest, user);
		} catch (AuthenticationException ex) {
			throw ex;
		} catch (Exception ex) {
			log.error("CustomOAuth2UserService loadUser Error: {} ", ex.getMessage());
			throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
		}
	}

	private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
		ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

		OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
		Users savedUser = userRepository.findUserByEmail(userInfo.getEmail());

		if (savedUser != null) {
			if (savedUser.getProviderType() == ProviderType.LOCAL){
				log.error("CustomOAuth2UserService process Error: 기존 회원입니다. 자체 로그인을 이용해 주세요. ");
				throw new OAuthProviderMissMatchException(ALREADY_SIGNED_UP_LOCAL);
			}

			if (providerType != savedUser.getProviderType()) {
				log.error("CustomOAuth2UserService process Error: 다른 소셜에서 가입된 이메일 입니다. 해당 소셜 로그인을 이용해 주세요.");
				throw new OAuthProviderMissMatchException(ALREADY_SIGNED_UP_SOCIAL);
			}
			updateUser(savedUser, userInfo);
		} else {
			savedUser = createUser(userInfo, providerType);
		}

		return UserPrincipal.create(savedUser, user.getAttributes());
	}

	private Users createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
		Users user = Users.builder()
						.email(userInfo.getEmail())
						.nickname(userInfo.getName())
						.providerType(providerType)
						.roles(Collections.singletonList(Authority.ROLE_USER.name()))
						.build();

		return userRepository.saveAndFlush(user);
	}

	private void updateUser(Users user, OAuth2UserInfo userInfo) {
		if (userInfo.getName() != null && !user.getUsername().equals(userInfo.getName())) {
			user.setNickname(userInfo.getName());
		}
		user.setProfile(user.getProfile());
	}
}
