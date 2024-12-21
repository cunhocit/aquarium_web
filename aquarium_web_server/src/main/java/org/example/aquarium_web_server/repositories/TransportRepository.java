package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.Transports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportRepository extends JpaRepository<Transports, Long> {
    Transports findByTransport(String name);
}
