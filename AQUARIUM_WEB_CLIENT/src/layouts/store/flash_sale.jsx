/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';
import 'swiper/scss/effect-fade';
import 'swiper/scss/effect-cards';
import { Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudBolt, faTags, faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/cart_contetn';

export const FlashSale = ({data}) => {
    const [product_sale, setProduct] = useState();
    const navigate = useNavigate();
    const {cart, updateCart} = useCart();

    useEffect(() => {
        setProduct(data?.products.filter(p => p.discount_percentage));
    }, [data]);
    
    const getDayExpriedSale = (date) => {
        const today = new Date().getTime();
        const end_date = new Date(date).getTime();
        const diffTime = end_date - today;
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return days;
    }

    const linkToProductDetails = (id) => {
        if (!localStorage.getItem('jwt_token_customer')) {
            alert('Vui lòng đăng nhập để xem chi tiết sản phẩm');
            return;
        }
        navigate(`/product/${id}`);
    }

    const handleUpdateCart = (id, e) => {
        e.stopPropagation();
        updateCart(id);
    }

    return (
        <>  
            <section className="wrap-flash-sale">
                <div className="title-flash-sale">
                        <FontAwesomeIcon icon={faCloudBolt} />
                        <h1>Giảm giá - Mua nhanh kẻo hết </h1>
                    </div>

                    <div className="wrap-directory">
                        <div className='-directory'>
                            <Swiper
                                centeredSlides={true}
                                grabCursor={true}
                                loop={true}
                                speed={1000}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2,
                                        spaceBetween: 10,
                                    },
                                    481: {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 5,
                                        spaceBetween: 10,
                                    },
                                    1024: {
                                        slidesPerView: 6,
                                        spaceBetween: 10,
                                    },
                                    }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false
                                }}
                                modules={[Autoplay]}
                                className="mySwiper swiper-directory"
                            >
                                {product_sale?.map((product, index) => (
                                    <SwiperSlide className="swiper-slide-flash-sale" key={index}>
                                        <div className="box-product" onClick={() => linkToProductDetails(product.id)}>
                                            <img className="img-product" src={`http://localhost:8080/api/products/images/${product?.image ? product?.image : 'image.png'}`} alt="" />
                                            <div className="info-product">
                                                <p className="name-product">{product.name}</p>
                                                <div className="down-price-product">
                                                    <FontAwesomeIcon icon={faTags} />
                                                    <p>-{product?.discount_percentage} %</p>
                                                    <p><s>{product?.price.toLocaleString('vi-VN')}<u>đ</u></s></p>
                                                </div>
                                                <div className="price-product">
                                                    <p>{(product?.price*(1 - product?.discount_percentage/100)).toLocaleString('vi-VN')}<u>đ</u></p>
                                                </div>
                                            </div>
                                            <div className="-add-cart-shop" onClick={() => handleUpdateCart(product.id)}>
                                                <FontAwesomeIcon icon={faCartShopping}/>
                                            </div>
                                            <div className="-add-flash-sale">
                                                Còn {getDayExpriedSale(product?.end_date)} ngày
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
            </section>
        </>
    )
}