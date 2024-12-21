package org.example.aquarium_web_server.dto;

public class AddCommentDTO {
    private String comment;
    private String id_product;
    private String cus_id;

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setId_product(String id_product) {
        this.id_product = id_product;
    }

    public void setCus_id(String cus_id) {
        this.cus_id = cus_id;
    }

    public String getComment() {
        return comment;
    }

    public String getId_product() {
        return id_product;
    }

    public String getCus_id() {
        return cus_id;
    }
}
