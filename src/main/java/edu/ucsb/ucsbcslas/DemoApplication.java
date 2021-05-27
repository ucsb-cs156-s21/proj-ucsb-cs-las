package edu.ucsb.ucsbcslas;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = "classpath:secrets-localhost.properties", ignoreResourceNotFound = true)
@SpringBootApplication
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  // By default, the Jackson ObjectMapper is unable to properly serialize the Java LocalTime class.
  // We define a primary ObjectMapper bean here so that we can include the JavaTimeModule module
  // for all autowired instances of ObjectMapper.
  @Bean
  @Primary
  public ObjectMapper objectMapper() {
    return new ObjectMapper()
      .registerModule(new JavaTimeModule());
  }
}
