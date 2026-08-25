package com.newscraft.service;

import com.newscraft.dto.NoteRequest;
import com.newscraft.entity.Note;
import com.newscraft.repository.NoteRepository;
import java.util.List;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> findAll(String ownerId) {
        return noteRepository.findAllByOwnerId(ownerId);
    }

    public Note create(NoteRequest request, String ownerId) {
        Note note = new Note();
        note.setTitle(request.title());
        note.setContent(request.content());
        note.setOwnerId(ownerId);
        return noteRepository.save(note);
    }

    public Note update(String id, NoteRequest request, String ownerId) {
        Note note = noteRepository.findByIdAndOwnerId(id, ownerId)
            .orElseThrow(() -> new AccessDeniedException("Access denied"));
        note.setTitle(request.title());
        note.setContent(request.content());
        return noteRepository.save(note);
    }

    public void delete(String id, String ownerId) {
        if (noteRepository.findByIdAndOwnerId(id, ownerId).isEmpty()) {
            throw new AccessDeniedException("Access denied");
        }
        noteRepository.deleteByIdAndOwnerId(id, ownerId);
    }
}
