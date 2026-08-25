package com.newscraft.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

import com.newscraft.dto.LoginRequest;
import com.newscraft.dto.RegisterRequest;
import com.newscraft.entity.User;
import com.newscraft.exception.ConflictException;
import com.newscraft.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @Mock UserRepository userRepository;
    @Mock PasswordEncoder passwordEncoder;
    @Mock JwtService jwtService;
    @InjectMocks AuthService authService;

    @Test
    void registrationHashesPasswordAndDoesNotReturnIt() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Prachi");
        request.setEmail("Prachi@example.com");
        request.setPassword("password123");
        when(userRepository.existsByEmailIgnoreCase("prachi@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("$2a$hashed");
        when(userRepository.save(org.mockito.ArgumentMatchers.any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        var response = authService.register(request);

        assertThat(response.token()).isNull();
        assertThat(response.email()).isEqualTo("prachi@example.com");
        org.mockito.ArgumentCaptor<User> captor = org.mockito.ArgumentCaptor.forClass(User.class);
        org.mockito.Mockito.verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getPassword()).isEqualTo("$2a$hashed");
    }

    @Test
    void duplicateEmailIsRejected() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Prachi");
        request.setEmail("prachi@example.com");
        request.setPassword("password123");
        when(userRepository.existsByEmailIgnoreCase("prachi@example.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(request)).isInstanceOf(ConflictException.class);
    }

    @Test
    void invalidLoginIsRejected() {
        when(userRepository.findByEmailIgnoreCase("prachi@example.com")).thenReturn(java.util.Optional.empty());

        assertThatThrownBy(() -> authService.login(new LoginRequest("prachi@example.com", "wrong")))
                .isInstanceOf(BadCredentialsException.class);
    }
}
