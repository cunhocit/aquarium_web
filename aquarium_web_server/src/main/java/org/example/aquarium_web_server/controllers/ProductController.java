package org.example.aquarium_web_server.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.MultipartConfigElement;
import org.example.aquarium_web_server.models.Product;
import org.example.aquarium_web_server.repositories.CategoriesRepository;
import org.example.aquarium_web_server.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoriesRepository categoriesRepository;
    @Qualifier("multipartConfigElement")
    @Autowired
    private MultipartConfigElement multipartConfigElement;

    @GetMapping("/get_products")
    public ResponseEntity<?> getProduct() {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("products", productRepository.findAll());
            data.put("categories", categoriesRepository.findAll());

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_products_client")
    public ResponseEntity<?> getProductsClient() {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("products", productRepository.findAll());
            data.put("categories", categoriesRepository.findAll());

            response.put("data", data);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_product_by_id")
    public ResponseEntity<?> getProductById(@RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Product product = productRepository.findById(id).get();

            response.put("data", product);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_list_products_by_id")
    public ResponseEntity<?> getListProductsById(@RequestParam("list_id") String list_id) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Product> products = new ArrayList<>();

            if (list_id == null || list_id.isEmpty()) {
                response.put("message", "Tham số list_id không được để trống.");
                return ResponseEntity.ok(response);
            }

            String decodedListId = URLDecoder.decode(list_id, StandardCharsets.UTF_8);

            ObjectMapper objectMapper = new ObjectMapper();

            // Kiểm tra nếu list_id chỉ chứa 1 giá trị, nếu vậy thì chuyển thành danh sách có 1 phần tử
            List<Integer> ids;
            if (decodedListId.startsWith("[") && decodedListId.endsWith("]")) {
                // Nếu là chuỗi JSON dạng mảng (ví dụ: "[1,2,3]"), chuyển thành List
                ids = objectMapper.readValue(decodedListId, List.class);
            } else {
                // Nếu chỉ là một giá trị duy nhất, biến nó thành một danh sách có một phần tử
                ids = new ArrayList<>();
                ids.add(Integer.parseInt(decodedListId));
            }

            for (Integer id : ids) {
                Product product = productRepository.findById(id);
                product.setQuantity(1);
                products.add(product);
            }

            response.put("data", products);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/delete_product")
    public ResponseEntity<?> deleteProduct(@RequestBody Map<String, String> data) {
        Map<String, Object> response = new HashMap<>();
        try {
            Product product = productRepository.findByName(data.get("name"));
            productRepository.delete(product);
            response.put("message", "Xóa sản phẩm thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/update_prd")
    public ResponseEntity<?> updateProduct(@RequestBody Product product) {
        Map<String, Object> response = new HashMap<>();
        try {
            Product product_ = productRepository.findById(product.getId()).get();
            product_.setCategory(product.getCategory());
            product_.setName(product.getName());
            product_.setDescription(product.getDescription());
            product_.setPrice(product.getPrice());
            product_.setQuantity(product.getQuantity());
            productRepository.save(product_);

            response.put("message", "Cập nhật sản phẩm thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/add_product")
    public ResponseEntity<?> addProduct(@RequestParam("name") String name,
                                        @RequestParam("category") String category,
                                        @RequestParam("description") String description,
                                        @RequestParam("price") String price,
                                        @RequestParam("image") MultipartFile image) {
        Map<String, Object> response = new HashMap<>();
        try {
            Product product = productRepository.findByName(name);
            if (image.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            if (product == null) {
                Product newProduct = Product.builder()
                        .name(name)
                        .price(Integer.parseInt(price))
                        .category(category)
                        .description(description)
                        .quantity(0)
                        .build();

                productRepository.save(newProduct);
                Product new_Product = productRepository.findByName(name);

                String uploadDir = multipartConfigElement.getLocation() + "/images/products/";

//              Lưu ảnh
                String id = String.valueOf(new_Product.getId());
                String timestamp = String.valueOf(System.currentTimeMillis());
                String fileExtension = image.getOriginalFilename().split("\\.")[1];
                String fileName = id + "_" + timestamp + "." + fileExtension;

                File uploadDirFile = new File(uploadDir);
                if (!uploadDirFile.exists()) {
                    uploadDirFile.mkdirs();
                }

                String filePath = uploadDir + fileName;
                image.transferTo(new File(filePath));

                new_Product.setImage(fileName);
                productRepository.save(new_Product);

                response.put("message", "Thêm sản phẩm thành công");
            } else {
                response.put("message", "Sản phẩm đã tồn tại!");
                return ResponseEntity.ok(response);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/update_prd_image")
    public ResponseEntity<?> updateProductImage(@RequestParam("id") String id,
                                        @RequestParam("time") String time,
                                        @RequestParam("file") MultipartFile file,
                                        @RequestParam("fileExtension") String fileExtension
    ) {
        Map<String, Object> response = new HashMap<>();
        try {
            String fileName = id + "_" + time + "." + fileExtension;
            String uploadDir = multipartConfigElement.getLocation() + "/images/products/";
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

//          Xóa file cũ
            Product product = productRepository.findById(Long.parseLong(id));
            String oldImage = product.getImage();
            if (oldImage != null) {
                File oldFile = new File(uploadDir + fileName);
                if (oldFile.exists()) {oldFile.delete();}
            }

//          Thêm file mới
            String filePath = uploadDir + fileName;
            file.transferTo(new File(filePath));

            product.setImage(fileName);
            productRepository.save(product);

            response.put("message", "Thêm sản phẩm thành công");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/update_product_sale")
    public ResponseEntity<?> updateProductSale(@RequestBody List<Product> products) {
        Map<String, Object> response = new HashMap<>();
        try {
            for (Product product : products) {
                productRepository.save(product);
            }

            response.put("message", "Câp nhật thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/delete_product_sale")
    public ResponseEntity<?> deleteProductSale(@RequestBody List<Product> products) {
        Map<String, Object> response = new HashMap<>();
        try {
            for (Product product : products) {
                product.setDiscount_percentage(null);
                product.setEnd_date(null);
                productRepository.save(product);
            }

            response.put("message", "Hủy khuyến mãi thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @GetMapping("/get_random_10_product")
    public ResponseEntity<?> getRandom10Product() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Product> products = productRepository.findRandom10Products();
            response.put("product", products);
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

}
