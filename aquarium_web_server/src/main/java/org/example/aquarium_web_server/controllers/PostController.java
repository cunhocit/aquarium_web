package org.example.aquarium_web_server.controllers;

import jakarta.servlet.MultipartConfigElement;
import org.example.aquarium_web_server.models.Post;
import org.example.aquarium_web_server.models.Product;
import org.example.aquarium_web_server.repositories.PostRepository;
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

@RestController
@RequestMapping("/api")
public class PostController {
    @Autowired
    PostRepository postRepository;
    @Qualifier("multipartConfigElement")
    @Autowired
    private MultipartConfigElement multipartConfigElement;

    @GetMapping("/get_posts")
    public ResponseEntity<?> getPosts() {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            List<Post> post = postRepository.findAll();
            response.put("data", post);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/client_get_posts")
    public ResponseEntity<?> clientGetPosts() {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            List<Post> post = postRepository.findAll();
            response.put("data", post);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @GetMapping("/client_get_3_posts")
    public ResponseEntity<?> clientGet3Posts() {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            List<Post> post = postRepository.findRandom3Posts();
            response.put("data", post);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/add_post")
    public ResponseEntity<?> addPost(@RequestParam("header") String header,
                                     @RequestParam("content") String content,
                                     @RequestParam("image") MultipartFile image) {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            Post post_ = postRepository.findByHeader(header);
            if (post_ != null) {
                response.put("message", "Tiêu đề đã tồn tại");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            Post newPost = new Post();
            newPost.setHeader(header);
            newPost.setContent(content);
            postRepository.save(newPost);

            String uploadDir = multipartConfigElement.getLocation() + "/images/posts/";

//              Lưu ảnh
            String id = String.valueOf(newPost.getId());
            String timestamp = String.valueOf(System.currentTimeMillis());
            String fileExtension = image.getOriginalFilename().split("\\.")[1];
            String fileName = id + "_" + timestamp + "." + fileExtension;

            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            String filePath = uploadDir + fileName;
            image.transferTo(new File(filePath));

            newPost.setImage(fileName);
            postRepository.save(newPost);

            response.put("message", "Thêm bài viết mới thành công");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/update_post")
    public ResponseEntity<?> updatePost(@RequestParam("id") Long id,
                                        @RequestParam("header") String header,
                                        @RequestParam("content") String content,
                                        @RequestParam(value = "image", required = false) MultipartFile image,
                                        @RequestParam("URLImage") String URLImage) {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            Post post_ = postRepository.findById(id);

            List<Post> posts = postRepository.findAll();
            posts.remove(post_);

            for (Post p : posts) {
                if (header.equals(p.getHeader())) {
                    response.put("message", "Tiêu đề đã tồn tại");
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
                }
            }

            post_.setHeader(header);
            post_.setContent(content);

            if (!URLImage.isEmpty()) {
                String fileExtension = image.getOriginalFilename().split("\\.")[1];
                String fileName = id + "_" + System.currentTimeMillis() + "." + fileExtension;
                String uploadDir = multipartConfigElement.getLocation() + "/images/posts/";

                File uploadDirFile = new File(uploadDir);
                if (!uploadDirFile.exists()) {
                    uploadDirFile.mkdirs();
                }

                String oldImage = post_.getImage();
                if (oldImage != null) {
                    File oldFile = new File(uploadDir + fileName);
                    if (oldFile.exists()) {oldFile.delete();}
                }

                String filePath = uploadDir + fileName;
                image.transferTo(new File(filePath));
                post_.setImage(fileName);
            }

            postRepository.save(post_);

            response.put("message", "Cập nhật viết mới thành công");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }


    @PostMapping("/delete_post")
    public ResponseEntity<?> deletePost(@RequestBody Post post) {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            Post post_ = postRepository.findById(post.getId());
            if (post_ == null) {
                response.put("message", "Bài viết không tồn tại");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            post_.setHeader(post.getHeader());
            post_.setContent(post.getContent());
            postRepository.delete(post_);

            response.put("message", "Xóa mới thành công");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
