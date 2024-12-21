package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.Admin;
import org.example.aquarium_web_server.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository  extends JpaRepository<Customer, Long>  {
    List<Customer> findAllByEmail(String email);
    Customer findByEmail(String email);
}
