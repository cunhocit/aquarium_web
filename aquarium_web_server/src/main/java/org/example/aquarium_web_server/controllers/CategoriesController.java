package org.example.aquarium_web_server.controllers;

import org.example.aquarium_web_server.models.Categories;
import org.example.aquarium_web_server.repositories.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CategoriesController {
    @Autowired
    CategoriesRepository categoriesRepository;

    @GetMapping("/get_all_ctg")
    public ResponseEntity<?> getAllCategories() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Categories> data = categoriesRepository.findAll();

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/add_category")
    public ResponseEntity<?> addCategories(@RequestBody Map<String, String> categories) {
        Map<String, Object> response = new HashMap<>();
        try {
            String category = categories.get("category");
            Categories category_ = categoriesRepository.findCategoriesByCategory(category);
            if (category_ == null) {
                Categories newCategoriy = new Categories();
                newCategoriy.setCategory(category);
                categoriesRepository.save(newCategoriy);
                response.put("message", "Thêm danh mục mới thành công!");
            }else {
                response.put("message", "Danh mục đã tồn tại");
            }

            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/delete_category")
    public ResponseEntity<?> deleteCategories(@RequestBody List<String> categories) {
        Map<String, Object> response = new HashMap<>();
        try {
            for (String category : categories) {
                categoriesRepository.delete(
                        categoriesRepository.findCategoriesByCategory(category)
                );
            }

            response.put("message", "Xóa danh mục thành công");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

}
