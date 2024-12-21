package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Integer> {
    @Override
    List<OrderStatus> findAll();
}
