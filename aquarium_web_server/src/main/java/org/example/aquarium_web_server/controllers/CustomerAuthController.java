package org.example.aquarium_web_server.controllers;

import org.example.aquarium_web_server.models.Admin;
import org.example.aquarium_web_server.models.Customer;
import org.example.aquarium_web_server.models.PasswordResetToken;
import org.example.aquarium_web_server.models.VerifyEmail;
import org.example.aquarium_web_server.repositories.CustomerRepository;
import org.example.aquarium_web_server.repositories.PasswordResetTokenRepository;
import org.example.aquarium_web_server.repositories.VerifyEmailRepository;
import org.example.aquarium_web_server.security.CryptAES;
import org.example.aquarium_web_server.services.EmailSevice;
import org.example.aquarium_web_server.services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.example.aquarium_web_server.controllers.AdminAuthController.generateToken;

@RestController
@RequestMapping("/api")
public class CustomerAuthController {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    VerifyEmailRepository verifyEmailRepository;

    @Autowired
    EmailSevice emailSevice;

    @Autowired
    JWTService jwtService;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @PostMapping("/customer_register")
    public ResponseEntity<?> CustomerRegister(@ModelAttribute Customer customer) {
        Map<String, Object> response = new HashMap<>();
        try {
            Customer newCustomer = Customer.builder()
                    .name(CryptAES.getInstance().decrypt(customer.getName()))
                    .email(CryptAES.getInstance().decrypt(customer.getEmail()))
                    .password(customer.getPassword())
                    .balance(0)
                    .verify(0)
                    .gender("Khác")
                    .phone(CryptAES.getInstance().decrypt(customer.getPhone()))
                    .build();

            Customer customer_ = customerRepository.findByEmail(newCustomer.getEmail());

            if (customer_ != null) {
                response.put("message", "Email đã được đăng ký");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            customerRepository.save(newCustomer);

            String token = generateToken();

            VerifyEmail verifyEmail = VerifyEmail.builder()
                    .email(newCustomer.getEmail())
                    .token(token)
                    .build();
            verifyEmailRepository.save(verifyEmail);

            emailSevice.sendVerifyEmail(newCustomer.getEmail(), token, newCustomer.getName(), "customer");

            response.put("message", "Đăng ký thành công! Kiểm tra email để xác thực tài khoản!");
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", "Có lỗi xảy ra: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/customer_login")
    public ResponseEntity<?> CustomerLogin(@ModelAttribute Customer customer) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = CryptAES.getInstance().decrypt(customer.getEmail());
            String password = customer.getPassword();

            Customer customer_ = customerRepository.findByEmail(email);

            if (customer_ == null) {
                response.put("message", "Email chưa được đăng ký");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            if (!password.equals(customer_.getPassword())) {
                response.put("message", "Mật khẩu sai");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            if (customer_.getVerify() != 1) {
                String token = generateToken();

                VerifyEmail verifyEmail = VerifyEmail.builder()
                        .email(customer.getEmail())
                        .token(token)
                        .build();
                verifyEmailRepository.save(verifyEmail);

                emailSevice.sendVerifyEmail(customer_.getEmail(), token, customer.getName(), "customer");

                response.put("message", "Email chưa được xác thực. Vui lòng kiểm tra email của bạn!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            String jwtToken = jwtService.generateTokenCustomer(customer_);
            Date exp = jwtService.extractExpiration(jwtToken);

            response.put("jwt_token", jwtToken);
            response.put("cus_id", customer_.getId());
            response.put("exp", exp);
            response.put("message", "Đăng ký thành công! Kiểm tra email để xác thực tài khoản!");

            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", "Có lỗi xảy ra: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/customer_password_reset")
    private ResponseEntity<?> PasswordReset(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email_ = CryptAES.getInstance().decrypt(body.get("email"));
            Customer customer_ = customerRepository.findByEmail(email_);
            if (customer_ == null) {
                response.put("message", "Email chưa được đăng ký");
                return ResponseEntity.badRequest().body(response);
            }else if (customer_.getVerify() == 0) {
                response.put("message", "Email chưa được kích hoạt\nVui lòng kiểm tra email để kích hoạt mật khẩu.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response); // 403 Forbidden
            }else if (customer_.getVerify() == 1) {
                response.put("message", "Vui lòng kiểm tra email để nhận mật khẩu mới");
                String name = customer_.getName();
                String token = generateToken();
                PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                        .email(email_)
                        .token(token)
                        .build();
                passwordResetTokenRepository.save(passwordResetToken);
                emailSevice.sendPasswordResetEmail(email_, token, name, "customer");
            }
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(response);
        }
    }

}
