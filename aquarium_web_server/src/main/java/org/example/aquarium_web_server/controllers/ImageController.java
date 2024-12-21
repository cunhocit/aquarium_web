package org.example.aquarium_web_server.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ImageController {
    private final String STORAGE_PATH = "src/main/resources/static/images/";

    @GetMapping("/products/images/{filename}")
    public ResponseEntity<?> getProductImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get(STORAGE_PATH + "products/" + filename);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(getMediaType(filename))
                        .body(resource);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Image not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error loading image");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/customers/images/{filename}")
    public ResponseEntity<?> getCustomerImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get(STORAGE_PATH + "customers/" + filename);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Image not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error loading image");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/admins/images/{filename}")
    public ResponseEntity<?> getAdminImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get(STORAGE_PATH + "admins/" + filename);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(getMediaType(filename))
                        .body(resource);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Image not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error loading image");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/posts/images/{filename}")
    public ResponseEntity<?> getPostImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get(STORAGE_PATH + "posts/" + filename);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Image not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error loading image");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    public MediaType getMediaType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1);
        MediaType mediaType;
        switch (extension) {
            case "png":
                mediaType = MediaType.IMAGE_PNG;
                break;
            case "jpeg":
            case "jpg":
                mediaType = MediaType.IMAGE_JPEG;
                break;
            case "gif":
                mediaType = MediaType.IMAGE_GIF;
                break;
            default:
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }
        return mediaType;
    }
}
