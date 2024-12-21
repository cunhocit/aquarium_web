package org.example.aquarium_web_server.dto;

import org.example.aquarium_web_server.models.Product;

import java.util.List;

public class PaymentDTO {
    private String cus_id;
    private List<Product> listProduct;
    private String transport;
    private String pay_method;
    private Integer price;

    public void setCus_id(String cus_id) {
        this.cus_id = cus_id;
    }

    public void setPrice(Integer totalPrice) {
        this.price = totalPrice;
    }

    public Integer getPrice() {
        return price;
    }

    public void setListProduct(List<Product> listProduct) {
        this.listProduct = listProduct;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }


    public void setPay_method(String pay_method) {
        this.pay_method = pay_method;
    }

    public String getCus_id() {
        return cus_id;
    }

    public List<Product> getListProduct() {
        return listProduct;
    }

    public String getTransport() {
        return transport;
    }

    public String getPay_method() {
        return pay_method;
    }
}
