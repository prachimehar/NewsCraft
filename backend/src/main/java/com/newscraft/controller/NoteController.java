package com.newscraft.controller;

import com.newscraft.dto.ApiResponse;
import com.newscraft.dto.NoteRequest;
import com.newscraft.entity.Note;
import com.newscraft.service.NoteService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public ApiResponse<List<Note>> getNotes(Principal principal) {
        return ApiResponse.ok("Notes fetched successfully", noteService.findAll(principal.getName()));
    }

    @PostMapping("/notes")
    public ApiResponse<Note> createNote(@Valid @RequestBody NoteRequest request, Principal principal) {
        return ApiResponse.ok("Note added successfully", noteService.create(request, principal.getName()));
    }

    @PutMapping("/notes/{id}")
    public ApiResponse<Note> updateNote(@PathVariable String id, @Valid @RequestBody NoteRequest request, Principal principal) {
        return ApiResponse.ok("Note updated successfully", noteService.update(id, request, principal.getName()));
    }

    @DeleteMapping("/notes/{id}")
    public ApiResponse<Void> deleteNote(@PathVariable String id, Principal principal) {
        noteService.delete(id, principal.getName());
        return ApiResponse.ok("Note deleted successfully", null);
    }
}
