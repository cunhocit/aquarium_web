package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.Customer;
import org.example.aquarium_web_server.models.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RevenueRepository extends JpaRepository<Revenue, Integer> {
    @Override
    List<Revenue> findAll();
}
