package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.PayMethods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayMethodsRepository extends JpaRepository<PayMethods, Integer> {
    @Override
    List<PayMethods> findAll();
}
