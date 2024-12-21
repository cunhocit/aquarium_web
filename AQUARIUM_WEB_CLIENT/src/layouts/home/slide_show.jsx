/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { useGetRandom10Product } from '../../hooks/useHome';

export const SlideShow = ({slideShowRef, nextSection}) => {
    const {data, fetchData, isLoading} = useGetRandom10Product();
    if (isLoading) return <></>

    return (
        <>
            <section className="wrap-slide-show" ref={slideShowRef}>
                <div className="wrap-swiper">
                    <h1>Khám phá hệ sinh thái dưới nước</h1>

                    <Swiper effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            loop={'true'}
                            speed={1000}

                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}

                            autoplay={{
                                delay: 1000,
                                disableOnInteraction: false
                            }}
                            modules={[EffectCoverflow, Autoplay]}
                            className="mySwiper home-swiper"
                    >
                        {data?.map( (e) => (
                            <SwiperSlide className="home-swiper-slide" key={e.id} >
                                <img src={`http://localhost:8080/api/products/images/${e.image}`} alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="about-us-next" onClick={nextSection}>
                        <a>Tiếp tục</a>
                    </div>
                </div>
            </section>
        </>
    )
}