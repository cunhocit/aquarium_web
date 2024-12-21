package org.example.aquarium_web_server.security;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import org.springframework.stereotype.Component;

@Component
public class CryptAES {
    public static CryptAES getInstance() {
        return new CryptAES();
    }

    private SecureRandom secureRandom = new SecureRandom();

    private byte[] generateAESKey() {
        byte[] key = new byte[32];
        secureRandom.nextBytes(key);
        return key;
    }

    private byte[] getIVCode() {
        byte[] iv = new byte[16];
        secureRandom.nextBytes(iv);
        return iv;
    }

    private String timeStamp() {
        LocalDateTime now = LocalDateTime.now();
        return String.format("%02d%02d%02d",
                now.getHour(), now.getMinute(), now.getSecond());
    }

    private record TransformedKey(SecretKey newAESKey, byte[] iv, String timeStr) {}

    private TransformedKey transformKey(byte[] aesKey, byte[] iv, String timeStr) throws Exception {
        int timeShift = Integer.parseInt(timeStr.substring(0, 2)) *
                Integer.parseInt(timeStr.substring(2, 4)) *
                Integer.parseInt(timeStr.substring(4, 6));

        int iterations = Math.max(1000, Math.min(10000, timeShift * 10));

        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        PBEKeySpec spec = new PBEKeySpec(
                Base64.getEncoder().encodeToString(aesKey).toCharArray(),
                iv,
                iterations,
                256
        );

        SecretKey newAESKey = new SecretKeySpec(
                factory.generateSecret(spec).getEncoded(), "AES");

        return new TransformedKey(newAESKey, iv, timeStr);
    }

    private String mixEncodedData(byte[] aesKey, byte[] encryptData, byte[] iv, String timeStr) {
        String aesKeyBase64 = Base64.getEncoder().encodeToString(aesKey);
        String ivBase64 = Base64.getEncoder().encodeToString(iv);
        String timeStrBase64 = Base64.getEncoder().encodeToString(timeStr.getBytes());
        String encryptDataBase64 = Base64.getEncoder().encodeToString(encryptData);

        String[] aesKeyParts = new String[4];
        String[] ivParts = new String[4];

        for (int i = 0; i < 4; i++) {
            aesKeyParts[i] = aesKeyBase64.substring(i * 11, (i + 1) * 11);
            ivParts[i] = ivBase64.substring(i * 6, (i + 1) * 6);
        }

        StringBuilder mixedParts = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            mixedParts.append(aesKeyParts[i]).append(ivParts[i]);
        }

        return encryptDataBase64.substring(0, 8) +
                mixedParts.substring(0, 32) +
                timeStrBase64 +
                mixedParts.substring(32) +
                encryptDataBase64.substring(8);
    }

    public String encrypt(String data) throws Exception {
        byte[] aesKey = generateAESKey();
        byte[] ivCode = getIVCode();
        String timeStr = timeStamp();

        TransformedKey transformed = transformKey(aesKey, ivCode, timeStr);

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, transformed.newAESKey,
                new IvParameterSpec(transformed.iv));

        byte[] encryptedData = cipher.doFinal(data.getBytes());

        return mixEncodedData(aesKey, encryptedData, transformed.iv, transformed.timeStr);
    }

    public String decrypt(String encodedData) throws Exception {
        String encryptDataBase64 = encodedData.substring(0, 8) +
                encodedData.substring(84);
        String mixedPartsBase64 = encodedData.substring(8, 40) +
                encodedData.substring(48, 84);
        String timeStrBase64 = encodedData.substring(40, 48);

        String timeStr = new String(Base64.getDecoder().decode(timeStrBase64));

        ParsedParts parsed = parseMixedParts(mixedPartsBase64);
        TransformedKey transformed = transformKey(parsed.aesKey, parsed.ivCode, timeStr);

        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, transformed.newAESKey,
                new IvParameterSpec(transformed.iv));

        byte[] decryptedData = cipher.doFinal(
                Base64.getDecoder().decode(encryptDataBase64));

        return new String(decryptedData);
    }

    private record ParsedParts(byte[] aesKey, byte[] ivCode) {}

    private ParsedParts parseMixedParts(String mixedParts) {
        String[] aesKeyParts = new String[4];
        String[] ivParts = new String[4];

        for (int i = 0; i < 4; i++) {
            aesKeyParts[i] = mixedParts.substring(i * 17, i * 17 + 11);
            ivParts[i] = mixedParts.substring(i * 17 + 11, (i + 1) * 17);
        }

        String aesKey = String.join("", aesKeyParts);
        String ivCode = String.join("", ivParts);

        return new ParsedParts(
                Base64.getDecoder().decode(aesKey),
                Base64.getDecoder().decode(ivCode)
        );
    }

    public String hashPassword(String password) {
        try {
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}