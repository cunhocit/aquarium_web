/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { faCartShopping, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { useCart } from "./cart_contetn";
import { useGetListProductsById } from "../hooks/useProduct";

export const ShopingCart = ({shopCart, handleOpenShopCart}) => {
    const cartRef = useRef(null);
    const {cart, updateCart, deleteCart} = useCart();
    const {data, fetchData, isLoading} = useGetListProductsById();
    
    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            handleOpenShopCart(); 
        }
    };

    useEffect(() => {
        if (shopCart) {
            document.addEventListener("mousedown", handleClickOutside);
        }else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [shopCart]);

    useEffect(() => {
        if (cart >= 0) {
            fetchData();
        }
    }, [cart]);

    return (
        <>
            <div className={`wrap-shopping-cart ${!shopCart ? 'hidden' : ''}`} ref={cartRef}>
                <div className="shopping-cart-box">
                    <h2>
                        <div>
                            <FontAwesomeIcon icon={faCartShopping} />
                            Giỏ hàng
                        </div>
                        <FontAwesomeIcon icon={faX} onClick={handleOpenShopCart}/>
                    </h2>

                    <hr />

                    <div className="shopping-cart-item">

                        {data?.map((product) => (
                            <div className="wrap-cart-item" key={product?.id}>
                                <img src={`http://localhost:8080/api/products/images/${product?.image ? product?.image : 'image.png'}`} alt="" />
                                <div className="-cart-info">
                                    <p className="-cart-name">{product?.name}</p>
                                    <p className="-cart-info-item">Đơn giá: {product?.price.toLocaleString('vi-VN')} đ</p>
                                    <p className="-cart-info-item">Giảm giá: {product?.discount_percentage ? (product?.discount_percentage + '%') : 'Không có'}</p>
                                    <p className="-cart-info-item">Giá chót: {(product?.price - product?.discount_percentage/100*product?.price).toLocaleString('vi-VN')} đ</p>
                                    <div onClick={() => deleteCart(product?.id)}>Xóa</div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <Link to={'/payment'}>Thanh toán ngay</Link>
                </div>
            </div>
        </>
    )
}