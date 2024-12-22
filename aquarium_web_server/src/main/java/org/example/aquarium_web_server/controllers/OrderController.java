package org.example.aquarium_web_server.controllers;

import org.aspectj.weaver.ast.Or;
import org.example.aquarium_web_server.dto.PaymentDTO;
import org.example.aquarium_web_server.models.*;
import org.example.aquarium_web_server.repositories.*;
import org.example.aquarium_web_server.security.CryptAES;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OrderController {
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderStatusRepository orderStatusRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    PayMethodsRepository payMethodsRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    TransportRepository transportRepository;
    @Autowired
    RevenueRepository revenueRepository;

    @GetMapping("/get_order_by_prd_name")
    public ResponseEntity<?> getOrdersByPrdName(@RequestParam String name) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("orders", orderRepository.findAllByProduct(name));

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_orders")
    public ResponseEntity<?> getOrders() {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("orders", orderRepository.findAll());

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_order_by_id")
    public ResponseEntity<?> getOrdersByid(@RequestParam int id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("order", orderRepository.findAllById(id));
            data.put("products", productRepository.findAll());
            data.put("pay_methods", payMethodsRepository.findAll());
            data.put("status", orderStatusRepository.findAll());

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/customer_get_order_by_id")
    public ResponseEntity<?> CUSGetOrdersById(@RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> data = new HashMap<>();
            Customer customer = customerRepository.findById(id).get();

            data.put("order", orderRepository.findByEmail(customer.getEmail()));
            data.put("products", productRepository.findAll());
            data.put("pay_methods", payMethodsRepository.findAll());
            data.put("status", orderStatusRepository.findAll());

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/destroy_order")
    public ResponseEntity<?> DestroyOrder(@RequestBody Map<String, Long> data) {
        Map<String, Object> response = new HashMap<>();
        try {
            Order order = orderRepository.findById(data.get("id"));
            order.setStatus("Đã hủy");
            orderRepository.save(order);

            response.put("data", "Hủy đơn thành công");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/update_order")
    public ResponseEntity<?> updateOrder(@RequestBody Order order) {
        Map<String, Object> response = new HashMap<>();
        try {
            Order order_ = orderRepository.findById(order.getId());
            Product product = null;
            if (order_ != null) {
                product = productRepository.findByName(order_.getProduct());
            }
            if (product == null || order_ == null) {
                response.put("message", "Không tìm thấy đơn hàng");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }
            if (product.getQuantity() < order.getQuantity()) {
                response.put("message", "Số lượng sản phẩm chỉ còn " + product.getQuantity());
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            order_.setAddress(order.getAddress());
            order_.setPhone(order.getPhone());
            order_.setProduct(order.getProduct());
            order_.setQuantity(order.getQuantity());
            order_.setPay_method(order.getPay_method());
            order_.setStatus(order.getStatus());
            order_.setUpdated_at(Timestamp.valueOf(LocalDateTime.now()));

            if (order.getStatus().equals("Hoàn thành")) {
                Revenue revenue = Revenue.builder()
                .category(product.getCategory())
                .product(product.getName())
                .quantity(product.getQuantity())
                .revenue(calPrice(product))
                .created_at(Timestamp.valueOf(LocalDateTime.now()))
                .updated_at(Timestamp.valueOf(LocalDateTime.now()))
                .build();
                revenueRepository.save(revenue);
            }

            orderRepository.save(order_);

            response.put("message", "Cập nhật thành công");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/payment")
    public ResponseEntity<?> Payment(@RequestBody PaymentDTO paymentDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            String id = CryptAES.getInstance().decrypt(paymentDTO.getCus_id());
            Customer customer = customerRepository.findById(Long.valueOf(id)).get();

            if (customer.getAddress() == null) {
                response.put("message", "Vui lòng cập nhật địa chỉ trước khi đặt hàng!");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            if (paymentDTO.getPay_method().equals("Thanh toán bằng tài khoản")
                    && customer.getBalance() < paymentDTO.getPrice()) {
                response.put("message", "Số tiền không đủ, vui lòng nạp thêm tiền vào tài khoản. <3");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            for (Product product : paymentDTO.getListProduct()) {
                Product product_ = productRepository.findByName(product.getName());
                if (product_.getQuantity() < product.getQuantity()) {
                    response.put("message", "Sản phẩm đã hết hàng");
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
                }

                Order order = Order.builder()
                        .email(customer.getEmail())
                        .cus_name(customer.getName())
                        .phone(customer.getPhone())
                        .address(customer.getAddress())
                        .category(product.getCategory())
                        .product(product.getName())
                        .quantity(product.getQuantity())
                        .price(calPrice(product))
                        .pay_method(paymentDTO.getPay_method())
                        .status("Đang chờ")
                        .created_at(Timestamp.valueOf(LocalDateTime.now()))
                        .updated_at(Timestamp.valueOf(LocalDateTime.now()))
                        .transport(paymentDTO.getTransport())
                        .build();

//                Revenue revenue = Revenue.builder()
//                        .category(product.getCategory())
//                        .product(product.getName())
//                        .quantity(product.getQuantity())
//                        .revenue(calPrice(product))
//                        .created_at(Timestamp.valueOf(LocalDateTime.now()))
//                        .updated_at(Timestamp.valueOf(LocalDateTime.now()))
//                        .build();

                Product product1 = productRepository.findByName(product.getName());

                int quantity = product1.getQuantity() - product.getQuantity();
                product1.setQuantity(quantity);

                productRepository.save(product1);
                orderRepository.save(order);
//                revenueRepository.save(revenue);
            }

            int balance_ = customer.getBalance() - paymentDTO.getPrice();
            customer.setBalance(balance_);
            customerRepository.save(customer);

            response.put("message", "Đặt đơn hàng thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    private static int calPrice(Product product) {
        double price = product.getPrice();
        if (product.getDiscount_percentage() != null) {
            double percent = product.getDiscount_percentage()/100.0;
            double newPice = price  - percent * price;
            return (int) newPice;
        }
        return product.getPrice();
    }
}
