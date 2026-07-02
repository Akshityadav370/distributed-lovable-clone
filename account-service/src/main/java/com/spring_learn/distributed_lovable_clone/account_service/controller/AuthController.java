package com.spring_learn.distributed_lovable_clone.account_service.controller;

import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.AuthResponse;
import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.LoginRequest;
import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.RefreshTokenRequest;
import com.spring_learn.distributed_lovable_clone.account_service.dto.auth.SignupRequest;
import com.spring_learn.distributed_lovable_clone.account_service.service.AuthService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AuthController {

    AuthService authService;
//    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refresh(request.refreshToken()));
    }

//    @GetMapping("/me")
//    public ResponseEntity<UserProfileResponse> getProfile() {
//        Long userId = 1L;
//        return ResponseEntity.ok(userService.getProfile(userId));
//    } TODO

}
