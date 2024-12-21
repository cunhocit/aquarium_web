package org.example.aquarium_web_server.controllers;

import org.example.aquarium_web_server.models.Transports;
import org.example.aquarium_web_server.models.Voucher;
import org.example.aquarium_web_server.repositories.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TransportControllers {
    @Autowired
    TransportRepository transportRepository;

    @GetMapping("/get_transports")
    public ResponseEntity<?> getAllTransports() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Transports> transports = transportRepository.findAll();

            response.put("data", transports);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }
}
