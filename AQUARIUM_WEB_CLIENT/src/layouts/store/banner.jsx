/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';
import 'swiper/scss/effect-fade';
import 'swiper/scss/effect-cards';
import { Navigation, Autoplay, EffectCards } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Banner = ({data}) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const sort_data = data?.products?.sort((a, b) => b.turn_order - a.turn_order);
        setProducts(sort_data.slice(0, 10));
    }, [data]);
    
    const linkToProductDetails = (id) => {
        if (!localStorage.getItem('jwt_token_customer')) {
            alert('Vui lòng đăng nhập để xem chi tiết sản phẩm');
            return;
        }
        navigate(`/product/${id}`);
    }

    return (
        <>
            <section className="body-store">
                <div className="header-poster">
                    <div className="wrap-swiper-poster">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            centeredSlides={true}
                            loop={true}
                            speed={1000}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                            navigation={true}
                            modules={[Navigation, Autoplay]}
                            className="mySwiper swiper-header-poster"
                        >
                            <SwiperSlide className="swiper-slide-poster">
                                <img className="" src="/src/assets/img/store_poster/1.png" alt="" />
                            </SwiperSlide>

                            <SwiperSlide className="swiper-slide-poster">
                                <img src="/src/assets/img/store_poster/2.png" alt="" />
                            </SwiperSlide>

                            <SwiperSlide className="swiper-slide-poster">
                                <img src="/src/assets/img/store_poster/3.png" alt="" />
                            </SwiperSlide>

                            <SwiperSlide className="swiper-slide-poster">
                                <img src="/src/assets/img/store_poster/4.png" alt="" />
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className='wrap-directory'>
                        <div className="-directory">
                            <h1 className="directory-title">DANH MỤC NỔI BẬT</h1>
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
                                {products?.map(p => (
                                    <SwiperSlide key={p.name} className="swiper-slide-directory" onClick={() => linkToProductDetails(p.id)}>
                                        <img src={`http://localhost:8080/api/products/images/${p?.image ? p?.image : 'image.png'}`} alt="" />
                                        <p>{p.name}</p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}