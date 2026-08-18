package com.newscraft.service;

import com.newscraft.dto.NoteRequest;
import com.newscraft.entity.Note;
import com.newscraft.repository.NoteRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    public Note create(NoteRequest request) {
        Note note = new Note();
        note.setTitle(request.title());
        note.setContent(request.content());
        return noteRepository.save(note);
    }

    public Note update(String id, NoteRequest request) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        note.setTitle(request.title());
        note.setContent(request.content());
        return noteRepository.save(note);
    }

    public void delete(String id) {
        noteRepository.deleteById(id);
    }
}
