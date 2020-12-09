package edu.ucsb.ucsbcslas.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.ucsbcslas.advice.AuthControllerAdvice;
import edu.ucsb.ucsbcslas.documents.Login;
import edu.ucsb.ucsbcslas.repositories.LoginsRepository;

import edu.ucsb.ucsbcslas.entities.AppUser;

@WebMvcTest(value = LoginsController.class)
@WithMockUser
public class LoginsControllerTests {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @MockBean
    LoginsRepository mockLoginsRepository;
    @MockBean
    AuthControllerAdvice mockAuthControllerAdvice;
    private String exampleAuthToken = "token";
    
    @Test
    public void test_logins_unauthorizedIfNotAdmin() throws Exception {
        mockMvc
            .perform(get("/api/admin/logins").contentType("application/json").header(HttpHeaders.AUTHORIZATION, exampleAuthToken))
            .andExpect(status().is(200));
    }
    private String userToken() {
	return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.MkiS50WhvOFwrwxQzd5Kp3VzkQUZhvex3kQv-CLeS3M";
    }

    @Test
    public void testGetLogins() throws Exception {
	List<Login> expectedLogins = new ArrayList<Login>();
	expectedLogins.add(new Login("timestamp", "email", "firstName", "lastName"));
	when(mockLoginsRepository.findAll()).thenReturn(expectedLogins);
	MvcResult response = mockMvc.perform(get("/api/admin/logins").contentType("application/json")
					     .header(HttpHeaders.AUTHORIZATION, "Bearer " + userToken())).andExpect(status().isOk()).andReturn();
	
	verify(mockLoginsRepository, times(1)).findAll();
	
	String responseString = response.getResponse().getContentAsString();
	List<Login> actualLogins = objectMapper.readValue(responseString, new TypeReference<List<Login>>() {
	    });
	assertEquals(actualLogins, expectedLogins);
    }
    
}
