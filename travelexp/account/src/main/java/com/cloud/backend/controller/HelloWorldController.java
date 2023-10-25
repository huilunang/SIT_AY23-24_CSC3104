package com.cloud.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class HelloWorldController {

    @GetMapping(path = "/hello-world")
    String Hello() {
        return "Hello World";
    }

    @GetMapping(path = "/hello-world/{name}")
    String HelloWorld(@PathVariable String name) {
        System.out.print(name);
        return "Hello World" + name;
    }

    @GetMapping(path="/basicauth")
    public String basicAuthCheck() {
        return "Success";
    }
}