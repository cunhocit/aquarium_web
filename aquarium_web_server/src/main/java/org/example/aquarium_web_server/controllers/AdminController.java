package org.example.aquarium_web_server.controllers;

import jakarta.servlet.MultipartConfigElement;
import org.example.aquarium_web_server.models.Admin;
import org.example.aquarium_web_server.repositories.AdminRepository;
import org.example.aquarium_web_server.repositories.CustomerRepository;
import org.example.aquarium_web_server.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AdminController {
    @Autowired
    AdminRepository adminRepository;

    @Qualifier("multipartConfigElement")

    @Autowired
    private MultipartConfigElement multipartConfigElement;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CustomerRepository customerRepository;

    @GetMapping("/get_admin")
    public ResponseEntity<?> getAdmin(@RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Admin> admin = adminRepository.findById(id);
            if (admin.isPresent()) {
                Admin adminObj = admin.get();
                adminObj.setPassword("");
                response.put("admin", admin.get());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }else {
                response.put("message", "Không tìm thấy admin với ID: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_header_admin")
    public ResponseEntity<?> getHeaderAdmin(@RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Admin> admin = adminRepository.findById(id);
            if (admin.isPresent()) {
                Admin adminObj = admin.get();
                adminObj.setPassword("");

                Map<String, Object> data = new HashMap<>();
                data.put("admin", adminObj);
                data.put("products", productRepository.findAll());
                data.put("customers", customerRepository.findAll());

                response.put("data", data);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }else {
                response.put("message", "Không tìm thấy admin với ID: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/update_admin")
    public ResponseEntity<?> updateAdmin(@RequestBody Admin admin) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Admin> adminOptional = adminRepository.findById(admin.getId());
            if (adminOptional.isPresent()) {
                Admin adminObj = adminOptional.get();
                adminObj.setName(admin.getName());
                adminObj.setBirth_date(admin.getBirth_date());
                adminObj.setEmail(admin.getEmail());
                adminObj.setPhone(admin.getPhone());
                adminObj.setGender(admin.getGender());
                adminObj.setUpdated_at(LocalDateTime.now().toString());

                adminRepository.save(adminObj);

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

    @PostMapping("/change_password_admin")
    public ResponseEntity<?> changePasswordAdmin(@RequestParam("password") String password,
                                                 @RequestParam("new_password") String new_password,
                                                 @RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Admin> adminOptional = adminRepository.findById(id);
            if (adminOptional.isPresent()) {
                if (!password.equals(adminOptional.get().getPassword())) {
                    response.put("message", "Mật khẩu sai!");
                    return  ResponseEntity.ok(response);
                }
                adminOptional.get().setPassword(new_password);
                adminRepository.save(adminOptional.get());

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

    @PostMapping("/update_image_admin")
    public ResponseEntity<?> updateImageAdmin(@RequestParam("id") Long id,
                                              @RequestParam("file") MultipartFile file,
                                              @RequestParam("time") String time) {
        Map<String, Object> response = new HashMap<>();
        try {
            Admin admin_ = adminRepository.findById(id).get();

            if (admin_ == null) {
                response.put("message", "Không tìm thấy admin");
                return ResponseEntity.status(500).body(response);
            }

            String uploadDir = multipartConfigElement.getLocation() + "/images/admins/";
            String fileName = admin_.getId() + "_" + time + "." + file.getOriginalFilename().split("\\.")[1];

            String image_ = admin_.getImage();
            if (image_ != null) {
                File oldFile = new File((uploadDir + image_));
                if (oldFile.exists()) oldFile.delete();
            }

            File uploadFileDir = new File(uploadDir);
            if (!uploadFileDir.exists()) {
                uploadFileDir.mkdirs();
            }

            file.transferTo(new File(uploadDir + fileName));

            if (!new File(uploadDir + fileName).exists()) {
                response.put("message", "Có lỗi xảy ra");
                return ResponseEntity.badRequest().body(response);
            }

            admin_.setImage(fileName);
            adminRepository.save(admin_);

            response.put("message", "Cập nhật hình ảnh thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }
}
