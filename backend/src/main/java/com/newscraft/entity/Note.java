package com.newscraft.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "notes")
public class Note {
    @Id
    @JsonProperty("_id")
    private String id;
    private String title;
    private String content;
    private Instant date = Instant.now();
}
