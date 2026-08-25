package com.newscraft.repository;

import com.newscraft.entity.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface NoteRepository extends MongoRepository<Note, String> {
	List<Note> findAllByOwnerId(String ownerId);
	Optional<Note> findByIdAndOwnerId(String id, String ownerId);
	void deleteByIdAndOwnerId(String id, String ownerId);
}
