package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.Order;
import org.example.aquarium_web_server.models.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Override
    List<Order> findAll();

    List<Order> findAllByProduct(String product);

    Object findAllById(int id);

    Order findById(Long id);

    List<Order> findByEmail(String email);
}
