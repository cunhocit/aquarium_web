package org.example.aquarium_web_server.controllers;

import org.example.aquarium_web_server.dto.AddCommentDTO;
import org.example.aquarium_web_server.models.Comment;
import org.example.aquarium_web_server.models.Customer;
import org.example.aquarium_web_server.models.Product;
import org.example.aquarium_web_server.repositories.CommentRepository;
import org.example.aquarium_web_server.repositories.CustomerRepository;
import org.example.aquarium_web_server.repositories.ProductRepository;
import org.example.aquarium_web_server.security.CryptAES;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CustomerRepository customerRepository;

    @GetMapping("/get_comments_by_product")
    public ResponseEntity<?> getCommentsByProduct(@RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Product product = productRepository.findById(id).get();
            List<Comment> comments = commentRepository.findByProduct(product.getName());
            List<Customer> customers = new ArrayList<>();

            for (Comment comment : comments) {
                customers.add(customerRepository.findById(Long.valueOf(comment.getCus_id())).get());
            }

            Map<String, Object> data = new HashMap<>();
            data.put("comments", comments);
            data.put("customers", customers);

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/add_comment")
    public ResponseEntity<?> addComment(@RequestBody AddCommentDTO comment) {
        Map<String, Object> response = new HashMap<>();
        try {
            System.out.println("comment.getId_product(): " + comment.getId_product());
            Long id_product = Long.valueOf(CryptAES.getInstance().decrypt(comment.getId_product()));
            Product product = productRepository.findById(id_product).get();

            Comment comment_ = Comment.builder()
                    .product(product.getName())
                    .comment(comment.getComment())
                    .cus_id(Integer.valueOf(CryptAES.getInstance().decrypt(comment.getCus_id())))
                    .build();
            commentRepository.save(comment_);

            response.put("data", "");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

}
