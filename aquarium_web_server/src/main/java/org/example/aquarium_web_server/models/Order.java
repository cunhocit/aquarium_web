package org.example.aquarium_web_server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String email;
    String cus_name;
    String phone;
    String address;
    String category;
    String product;
    Integer quantity;
    Integer price;
    String pay_method;
    String status;
    String transport;
    String discount_voucher;

    @CreationTimestamp
    private Timestamp created_at;
    @CreationTimestamp
    private Timestamp  updated_at;
}
