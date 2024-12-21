package org.example.aquarium_web_server.controllers;

import org.example.aquarium_web_server.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    RevenueRepository revenueRepository;
    @Autowired
    PayMethodsRepository payMethodsRepository;
    @Autowired
    OrderStatusRepository orderStatusRepository;
    @Autowired
    CategoriesRepository categoriesRepository;


    @GetMapping("/get_data_dashboard")
    private ResponseEntity<?> getDataDashboard() {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("orders", orderRepository.findAll());
            data.put("customers", customerRepository.findAll());
            data.put("products", productRepository.findAll());
            data.put("revenues", revenueRepository.findAll());
            data.put("payMethods", payMethodsRepository.findAll());
            data.put("orderStatus", orderStatusRepository.findAll());
            data.put("categories", categoriesRepository.findAll());

            response.put("data", data);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

}
