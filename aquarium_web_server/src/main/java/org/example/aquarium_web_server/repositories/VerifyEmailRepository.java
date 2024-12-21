package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.VerifyEmail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerifyEmailRepository extends JpaRepository<VerifyEmail, Long> {
    VerifyEmail findByEmail(String email);
    VerifyEmail deleteByEmail(String email);
}
