package edu.ucsb.ucsbcslas.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ObjectMapperConfig {
    // By default, the Jackson ObjectMapper is unable to properly serialize the Java LocalTime class.
    // We define a primary ObjectMapper bean here so that we can include the JavaTimeModule module
    // for all autowired instances of ObjectMapper.
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
            .registerModule(new JavaTimeModule());
    }
}