package org.example.aquarium_web_server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transports")
public class Transports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String transport;
    private int price;

    @CreationTimestamp
    private Timestamp created_at;
    @CreationTimestamp
    private Timestamp  updated_at;
}
