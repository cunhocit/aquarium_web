package org.example.aquarium_web_server.services;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class EmailSevice {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String emailFrom;

    public void sendVerifyEmail(String email, String token, String name, String type) {
        try {
            String subject = "Thế giới cá và thủy sinh - Xác thực tài khoản";
            File file = ResourceUtils.getFile("src/main/resources/templates/email_text.html");
            String body = new String(Files.readAllBytes(Paths.get(file.toURI())));

            body = body.replace("{{name}}", name)
                    .replace("{{token}}", token)
                    .replace("{{email}}", email)
                    .replace("{{type}}", type);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(emailFrom);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendPasswordResetEmail(String email, String token, String name, String type) {
        try {
            String subject = "Thế giới cá và thủy sinh - Mật khẩu mới";
            File file = ResourceUtils.getFile("src/main/resources/templates/forgot_password_text.html");
            String body = new String(Files.readAllBytes(Paths.get(file.toURI())));

            body = body.replace("{{name}}", name)
                    .replace("{{token}}", token)
                    .replace("{{email}}", email)
                    .replace("{{type}}", type);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(emailFrom);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

}
