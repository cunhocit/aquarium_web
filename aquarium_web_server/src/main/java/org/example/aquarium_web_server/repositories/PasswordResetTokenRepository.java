package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByEmail(String email);
    PasswordResetToken deleteByEmail(String email);
}
