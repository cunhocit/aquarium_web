package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.Post;
import org.example.aquarium_web_server.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Override
    List<Post> findAll();

    Post findByHeader(String header);
    Post findById(Long id);

    @Query(value = "SELECT * FROM post ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<Post> findRandom3Posts();
}
