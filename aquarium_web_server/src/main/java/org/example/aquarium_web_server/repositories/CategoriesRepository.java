package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Integer> {
    @Override
    List<Categories> findAll();

    Categories findCategoriesByCategory(String name);
}
