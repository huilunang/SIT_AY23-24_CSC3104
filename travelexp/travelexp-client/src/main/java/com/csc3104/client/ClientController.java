package com.csc3104.client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {
    // forward calls to ClientService that handles communication with private microservices
    @GetMapping("/client")
    public String helloClient() {
        return "hello from client";
    }
}
