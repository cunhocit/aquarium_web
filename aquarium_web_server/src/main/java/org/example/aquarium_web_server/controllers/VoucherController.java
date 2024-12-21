package org.example.aquarium_web_server.controllers;

import org.example.aquarium_web_server.models.Customer;
import org.example.aquarium_web_server.models.Product;
import org.example.aquarium_web_server.models.Voucher;
import org.example.aquarium_web_server.repositories.CustomerRepository;
import org.example.aquarium_web_server.repositories.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class VoucherController {
    @Autowired
    VoucherRepository voucherRepository;
    @Autowired
    CustomerRepository customerRepository;

    @GetMapping("/get_vouchers")
    public ResponseEntity<?> getVouchers() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Voucher> vouchers = voucherRepository.findAll();

            response.put("data", vouchers);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/claim_voucher")
    public ResponseEntity<?> claimVoucher(@RequestParam("voucher_id") Long voucher_id,
                                          @RequestParam("customer_id") Long customer_id
    ) {
        Map<String, Object> response = new HashMap<>();
        try {
            Voucher voucher = voucherRepository.findById(voucher_id).get();
            Customer customer = customerRepository.findById(customer_id).get();

            String claims = voucher.getCustomer_claims() + ',' + customer_id;
            String voucher_code = customer.getVoucherCodes() + ',' + voucher.getVoucherCode();

            int quantity = voucher.getQuantity();
            voucher.setCustomer_claims(claims);
            voucher.setQuantity(quantity-1);
            voucherRepository.save(voucher);

            customer.setVoucherCodes(voucher_code);
            customerRepository.save(customer);

            response.put("message", "Nhận voucher thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/add_voucher")
    public ResponseEntity<?> addVoucher(@RequestBody Voucher voucher) {
        Map<String, Object> response = new HashMap<>();
        try {
            String voucher_code = generateRandomString();
            Voucher voucher_ = voucherRepository.findByvoucherCode(voucher_code);

            while (voucher_ != null) {
                voucher_code = generateRandomString();
                voucher_ = voucherRepository.findByvoucherCode(voucher_code);
            }

            Voucher newVoucher = new Voucher();
            newVoucher.setType_code(voucher.getType_code());
            newVoucher.setVoucherCode(voucher_code);
            newVoucher.setDiscount_percentage(voucher.getDiscount_percentage());
            newVoucher.setQuantity(voucher.getQuantity());
            newVoucher.setEnd_date(voucher.getEnd_date());

            voucherRepository.save(newVoucher);

            response.put("message", "Tạo mới voucher thành công");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    public static String generateRandomString() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder result = new StringBuilder(10);

        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(characters.length());
            result.append(characters.charAt(randomIndex));
        }

        return result.toString();
    }

    @PostMapping("/update_voucher")
    public ResponseEntity<?> updateVoucher(@RequestBody List<Voucher> Vouchers) {
        Map<String, Object> response = new HashMap<>();
        try {
            for (Voucher voucher : Vouchers) {
                voucherRepository.save(voucher);
            }

            response.put("message", "Cập nhật thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }

    @PostMapping("/delete_voucher")
    public ResponseEntity<?> deleteVoucher(@RequestBody List<Voucher> Vouchers) {
        Map<String, Object> response = new HashMap<>();
        try {
            for (Voucher voucher : Vouchers) {
                voucherRepository.delete(voucher);
            }

            response.put("message", "Hủy mã thành công!");
            return ResponseEntity.ok(response);
        }catch (Exception e){
            e.printStackTrace();
            response.put("message", "Đã xảy ra lỗi khi xử lý yêu cầu." + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.toString());
        }
    }
}
