package com.csc3104.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        ResponseEntity<AuthenticationResponse> responseEntity = service.register(request);

        if (responseEntity.getStatusCode() == HttpStatusCode.valueOf(409)) {
            return ResponseEntity.status(409).body(responseEntity.getBody());
        } else {
            return ResponseEntity.ok(responseEntity.getBody());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
