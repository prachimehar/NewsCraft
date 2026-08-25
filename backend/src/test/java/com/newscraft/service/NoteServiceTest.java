package com.newscraft.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.newscraft.dto.NoteRequest;
import com.newscraft.entity.Note;
import com.newscraft.repository.NoteRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

@ExtendWith(MockitoExtension.class)
class NoteServiceTest {
    @Mock NoteRepository noteRepository;
    @InjectMocks NoteService noteService;

    @Test
    void createAssociatesNoteWithAuthenticatedOwner() {
        when(noteRepository.save(org.mockito.ArgumentMatchers.any(Note.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Note note = noteService.create(new NoteRequest("Title", "Content"), "user@example.com");

        assertThat(note.getOwnerId()).isEqualTo("user@example.com");
    }

    @Test
    void findAllQueriesOnlyAuthenticatedOwner() {
        when(noteRepository.findAllByOwnerId("user@example.com")).thenReturn(List.of());

        noteService.findAll("user@example.com");

        verify(noteRepository).findAllByOwnerId("user@example.com");
    }

    @Test
    void updateRequiresOwnedNote() {
        when(noteRepository.findByIdAndOwnerId("note-1", "user@example.com")).thenReturn(Optional.empty());

        org.assertj.core.api.Assertions.assertThatThrownBy(() -> noteService.update(
                        "note-1", new NoteRequest("Title", "Content"), "user@example.com"))
            .isInstanceOf(AccessDeniedException.class);
    }
}
