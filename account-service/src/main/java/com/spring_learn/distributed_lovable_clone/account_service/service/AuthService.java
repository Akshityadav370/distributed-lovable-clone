package com.spring_learn.distributed_lovable_clone.account_service.service;


import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.AuthResponse;
import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.LoginRequest;
import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.SignupRequest;

public interface AuthService {
    AuthResponse signup(SignupRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refresh(String refreshToken);
}
