package com.yvars.service.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    Logger logger = LoggerFactory.getLogger(TestController.class);
    @GetMapping("/test")
    String test(){
        logger.info("My Page service : TEST");
        return "My Page service : TEST";
    }
}
