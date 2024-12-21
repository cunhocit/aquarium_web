package org.example.aquarium_web_server.controllers;

import jakarta.servlet.MultipartConfigElement;
import jakarta.servlet.http.HttpServletRequest;
import org.example.aquarium_web_server.models.Admin;
import org.example.aquarium_web_server.models.Customer;
import org.example.aquarium_web_server.models.Order;
import org.example.aquarium_web_server.models.Revenue;
import org.example.aquarium_web_server.repositories.CustomerRepository;
import org.example.aquarium_web_server.repositories.OrderRepository;
import org.example.aquarium_web_server.repositories.ProductRepository;
import org.example.aquarium_web_server.repositories.RevenueRepository;
import org.example.aquarium_web_server.security.CryptAES;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CustomerController {
    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Qualifier("multipartConfigElement")

    @Autowired
    private MultipartConfigElement multipartConfigElement;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/get_customers")
    public ResponseEntity<?> getCustomers() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Customer> customers = customerRepository.findAll();
            response.put("data", customers);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_order_history_by_email")
    public ResponseEntity<?> getOrderHistoryByEmail(@RequestParam("email") String email) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Order> orders = orderRepository.findByEmail(email);
            response.put("data", orders);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", "Có lỗi xảy ra: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_navigation")
    public ResponseEntity<?> getNavigation(@RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("id", customerRepository.findById(id).get().getId());
            data.put("products", productRepository.findAll());

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", "Có lỗi xảy ra: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/get_customer_by_id")
    public ResponseEntity<?> getCustomerById(@RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Customer> customers = customerRepository.findById(id);
            Customer customer = customers.get();
            customer.setPassword(null);
            response.put("data", customer);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/update_customer")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Customer> customerOptional = customerRepository.findById(customer.getId());

            Customer fixCustomer = customerOptional.get();

            fixCustomer.setName(customer.getName());
            fixCustomer.setGender(customer.getGender());
            fixCustomer.setPhone(customer.getPhone());
            fixCustomer.setEmail(customer.getEmail());
            fixCustomer.setBirth_date(customer.getBirth_date());
            fixCustomer.setAddress(customer.getAddress());
            fixCustomer.setBalance(customer.getBalance());

            customerRepository.save(fixCustomer);

            response.put("message", "Cập nhật thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }


    @PostMapping("/update_image_customer")
    public ResponseEntity<?> updateImageCustomer(@RequestParam("id") String id,
                                                 @RequestParam("file") MultipartFile file,
                                                 @RequestParam("time") String time) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Customer> customerOptional = customerRepository.findById(Long.valueOf(id));
            Customer fixCustomer = customerOptional.get();

            String uploadDir = multipartConfigElement.getLocation() + "/images/customers/";

            String image_ = fixCustomer.getImage();
            if (image_ != null) {
                File oldFile = new File(uploadDir + image_);
                if (oldFile.exists()) {
                    oldFile.delete();
                }
            }

            String fileExtension = file.getOriginalFilename().split("\\.")[1];
            String fileName = id + "_" + time + "." + fileExtension;

            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            String filePath = uploadDir + fileName;
            file.transferTo(new File(filePath));

            fixCustomer.setImage(fileName);
            customerRepository.save(fixCustomer);

            response.put("message", "Cập nhật thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/change_password_customer")
    public ResponseEntity<?> changePasswordCustomer(@RequestParam("password") String password,
                                                 @RequestParam("new_password") String new_password,
                                                 @RequestParam("id") String id) {
        Map<String, Object> response = new HashMap<>();
        try {
            String id_ = CryptAES.getInstance().decrypt(id);
            Optional<Customer> customerOptional = customerRepository.findById(Long.parseLong(id_));
            if (customerOptional.isPresent()) {
                if (!password.equals(customerOptional.get().getPassword())) {
                    response.put("message", "Mật khẩu sai!");
                    return  ResponseEntity.ok(response);
                }
                customerOptional.get().setPassword(new_password);
                customerRepository.save(customerOptional.get());

                response.put("message", "Cập nhật thành công!");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }else {
                response.put("message", "Không tìm thấy dữ liệu");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }
}
