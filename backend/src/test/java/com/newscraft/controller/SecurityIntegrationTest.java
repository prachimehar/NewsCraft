package com.newscraft.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.newscraft.dto.AuthResponse;
import com.newscraft.service.AuthService;
import com.newscraft.service.JwtService;
import com.newscraft.service.NoteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;
import com.newscraft.security.JwtAuthenticationFilter;
import com.newscraft.security.SecurityConfig;

@WebMvcTest(controllers = {AuthController.class, NoteController.class})
@Import({SecurityConfig.class, JwtAuthenticationFilter.class})
class SecurityIntegrationTest {
    @Autowired MockMvc mockMvc;
    @MockBean AuthService authService;
    @MockBean NoteService noteService;
    @MockBean JwtService jwtService;

    @Test
    void notesRequireAuthentication() throws Exception {
        mockMvc.perform(get("/notes")).andExpect(status().isUnauthorized());
    }

    @Test
    void authRegisterIsPublic() throws Exception {
        when(authService.register(any())).thenReturn(new AuthResponse(null, "Prachi", "p@example.com", "USER"));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Prachi\",\"email\":\"p@example.com\",\"password\":\"password123\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void invalidBearerTokenCannotAccessNotes() throws Exception {
        when(jwtService.extractEmail(any())).thenThrow(new BadCredentialsException("Invalid token"));

        mockMvc.perform(get("/notes").header("Authorization", "Bearer invalid"))
                .andExpect(status().isUnauthorized());
    }
}
