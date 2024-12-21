package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    List<Product> findAll();
    Product findById(long id);
    Product findByName(String name);

    @Query(value = "SELECT * FROM product WHERE category = 'Cá cảnh' OR category = 'Cây thủy sinh' ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Product> findRandom10Products();
}
