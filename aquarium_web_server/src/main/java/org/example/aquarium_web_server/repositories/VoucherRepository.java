package org.example.aquarium_web_server.repositories;

import org.example.aquarium_web_server.models.PayMethods;
import org.example.aquarium_web_server.models.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    @Override
    List<Voucher> findAll();

    Voucher findByvoucherCode(String voucher_code);
}
