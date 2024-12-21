package org.example.aquarium_web_server.controllers;

import org.example.aquarium_web_server.models.Admin;
import org.example.aquarium_web_server.models.Customer;
import org.example.aquarium_web_server.models.PasswordResetToken;
import org.example.aquarium_web_server.models.VerifyEmail;
import org.example.aquarium_web_server.repositories.AdminRepository;
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
import org.springframework.web.servlet.ModelAndView;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
public class AdminAuthController {
    @Autowired
    AdminRepository adminRepository;

    @Autowired
    VerifyEmailRepository verifyEmailRepository;

    @Autowired
    EmailSevice emailService;

    @Autowired
    JWTService jwtService;

    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    CustomerRepository customerRepository;

    @PostMapping("/admin_login")
    private ResponseEntity<?> adminLogin(@RequestBody Admin admin) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = CryptAES.getInstance().decrypt(admin.getEmail());
            String password = admin.getPassword();

            Admin admin_ = adminRepository.findByEmail(email);
            if (admin_ == null) {
                response.put("message", "Email chưa được đăng ký.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 404 Not Found
            } else if (!email.equals(admin_.getEmail()) || !password.equals(admin_.getPassword())) {
                response.put("message", "Email hoặc mật khẩu chưa đúng.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // 401 Unauthorized
            } else if (admin_.getVerify() == 0) {
                response.put("message", "Email chưa được kích hoạt\nVui lòng kiểm tra email để kích hoạt mật khẩu.");
                String token = generateToken();
                emailService.sendVerifyEmail(email, token, admin_.getName(), "admin");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response); // 403 Forbidden
            } else {
                String jwtToken = jwtService.generateTokenAdmin(admin_);
                response.put("message", "Đăng nhập thành công.");
                response.put("id_admin", admin_.getId());
                response.put("jwt_token", jwtToken);
                response.put("exp", jwtService.extractExpiration(jwtToken));
                return ResponseEntity.status(HttpStatus.OK).body(response); // 200 OK
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }
    }

    @PostMapping("/admin_register")
    private ResponseEntity<?> adminRegister(@RequestBody Admin admin) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản");
        try {
            String email = CryptAES.getInstance().decrypt(admin.getEmail());
            String password = admin.getPassword();
            String phone = CryptAES.getInstance().decrypt(admin.getPhone());
            String name = CryptAES.getInstance().decrypt(admin.getName());

            Admin admin_ = adminRepository.findByEmail(email);
            if (admin_ != null) {
                response.put("message", "Email đã tồn tại");
                return ResponseEntity.badRequest().body(response);
            }

            Admin newAdmin = new Admin();
            newAdmin.setEmail(email);
            newAdmin.setPassword(password);
            newAdmin.setPhone(phone);
            newAdmin.setName(name);
            newAdmin.setVerify(0);
            adminRepository.save(newAdmin);

            String token = generateToken();

            VerifyEmail verifyEmail = new VerifyEmail();
            verifyEmail.setEmail(newAdmin.getEmail());
            verifyEmail.setToken(token);
            verifyEmailRepository.save(verifyEmail);

            emailService.sendVerifyEmail(newAdmin.getEmail(), token, newAdmin.getName(), "admin");

            return ResponseEntity.ok(response);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/password_reset")
    private ResponseEntity<?> PasswordReset(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email_ = CryptAES.getInstance().decrypt(body.get("email"));
            Admin admin_ = adminRepository.findByEmail(email_);
            if (admin_ == null) {
                response.put("message", "Email chưa được đăng ký");
                return ResponseEntity.badRequest().body(response);
            }else if (admin_.getVerify() == 0) {
                response.put("message", "Email chưa được kích hoạt\nVui lòng kiểm tra email để kích hoạt mật khẩu.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response); // 403 Forbidden
            }else if (admin_.getVerify() == 1) {
                response.put("message", "Vui lòng kiểm tra email để nhận mật khẩu mới");
                String name = admin_.getName();
                String token = generateToken();
                PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                        .email(email_)
                        .token(token)
                        .build();
                passwordResetTokenRepository.save(passwordResetToken);
                emailService.sendPasswordResetEmail(email_, token, name, "admin");
            }
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/verify_password_reset_token")
    private ModelAndView PasswordResetToken(@RequestParam("token") String token,
                                            @RequestParam("email") String email,
                                            @RequestParam("name") String name,
                                            @RequestParam("type") String type) {
        ModelAndView modelAndView = new ModelAndView("verify_page"); // tên template

        try {
            PasswordResetToken passwordReset = passwordResetTokenRepository.findByEmail(email);

            Admin admin = null;
            Customer customer = null;
            if (type.equals("admin")) {
                admin = adminRepository.findByEmail(email);

                if (passwordReset == null || admin == null) {
                    modelAndView.addObject("status", "invalid");
                    return modelAndView;
                }
            }
            if (type.equals("customer")) {
                customer = customerRepository.findByEmail(email);

                if (passwordReset == null || customer == null) {
                    modelAndView.addObject("status", "invalid");
                    return modelAndView;
                }
            }

            String token_ = passwordReset.getToken();
            if (token_ == null || !token_.equals(token)) {
                modelAndView.addObject("status", "invalid");
                return modelAndView;
            }

            LocalDateTime createTime = passwordReset.getCreated_at().toLocalDateTime();
            LocalDateTime now = LocalDateTime.now();
            if (Duration.between(createTime, now).toMinutes() > 5) {
//              Xóa token hết hạn
                passwordResetTokenRepository.deleteByEmail(email);
                String newToken_ = generateToken();
                emailService.sendPasswordResetEmail(email, newToken_, name, type);

                modelAndView.addObject("status", "expired");
                return modelAndView;
            }

            String newPassword = generatePassword();
            if (type.equals("admin")) {
                admin.setPassword(CryptAES.getInstance().hashPassword(newPassword));
                adminRepository.save(admin);
            }
            if (type.equals("customer")) {
                customer.setPassword(CryptAES.getInstance().hashPassword(newPassword));
                customerRepository.save(customer);
            }

            passwordResetTokenRepository.delete(passwordReset);

            modelAndView.addObject("status", "new-password");
            modelAndView.addObject("message", newPassword);
        } catch (Exception e) {
            e.printStackTrace();
            modelAndView.addObject("status", "error");
        }

        return modelAndView;
    }

    @GetMapping("/verify_email_token")
    private ModelAndView verifyEmailToken(  @RequestParam("token") String token,
                                            @RequestParam("email") String email,
                                            @RequestParam("name") String name,
                                            @RequestParam("type") String type) {
        ModelAndView modelAndView = new ModelAndView("verify_page");

        try {
            VerifyEmail verifyEmail = verifyEmailRepository.findByEmail(email);

            Admin admin = null;
            Customer customer = null;

            if (type.equals("admin")) {
                admin = adminRepository.findByEmail(email);
                if (admin.getVerify() == 1) {
                    modelAndView.addObject("status", "verify");
                    return modelAndView;
                }
                if (verifyEmail == null || admin == null) {
                    modelAndView.addObject("status", "invalid");
                    return modelAndView;
                }
            }

            if (type.equals("customer")) {
                customer = customerRepository.findByEmail(email);
                if (customer.getVerify() == 1) {
                    modelAndView.addObject("status", "verify");
                    return modelAndView;
                }
                if (verifyEmail == null || customer == null) {
                    modelAndView.addObject("status", "invalid");
                    return modelAndView;
                }
            }

            String token_ = verifyEmail.getToken();
            if (token_ == null || !token_.equals(token)) {
                modelAndView.addObject("status", "invalid");
                return modelAndView;
            }

            LocalDateTime createTime = verifyEmail.getCreated_at().toLocalDateTime();
            LocalDateTime now = LocalDateTime.now();
            if (Duration.between(createTime, now).toMinutes() > 5) {
                verifyEmailRepository.deleteByEmail(email);
                String newToken_ = generateToken();
                emailService.sendVerifyEmail(email, newToken_, name, type);
                modelAndView.addObject("status", "expired");
                return modelAndView;
            }

            if (type.equals("admin")) {
                admin.setVerify(1);
                admin.setVerify_at(now.toString());
                adminRepository.save(admin);
            }
            if (type.equals("customer")) {
                customer.setVerify(1);
                customer.setVerify_at(now.toString());
                customerRepository.save(customer);
            }
            verifyEmailRepository.delete(verifyEmail);

            modelAndView.addObject("status", "success");

        } catch (Exception e) {
            e.printStackTrace();
            modelAndView.addObject("status", "error");
        }

        return modelAndView;
    }

    public static String generateToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    public static String generatePassword() {
        Random random = new Random();
        int number = random.nextInt(90000000) + 10000000;
        return String.valueOf(number);
    }
}
