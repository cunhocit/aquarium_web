/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { faProductHunt } from "@fortawesome/free-brands-svg-icons"
import { faBoxes, faShuffle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';
import 'swiper/scss/effect-fade';
import 'swiper/scss/effect-cards';
import { Navigation, Autoplay, EffectCards } from 'swiper/modules';
import { useNavigate } from "react-router-dom";

export const ProductRelated = ({products}) => {
    const navigate = useNavigate();

    const linkToProductDetails = (id) => {
        if (!localStorage.getItem('jwt_token_customer')) {
            alert('Vui lòng đăng nhập để xem chi tiết sản phẩm');
            return;
        }
        navigate(`/product/${id}`);
        window.location.reload();
    }

    return (
        <>
            <div className="wrap-product-related">
                <p>
                    <FontAwesomeIcon icon={faShuffle} />
                    Sản phẩm liên quan
                </p>
                <hr />

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
                            slidesPerView: 4,
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
                    {products?.products?.map((product, index) => (
                        <SwiperSlide key={product.name} className="swiper-slide-directory" onClick={() => linkToProductDetails(product.id)}>
                            <img src={`http://localhost:8080/api/products/images/${product?.image ? product?.image : 'image.png'}`}  />
                            <div><p>{product.name}</p></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}