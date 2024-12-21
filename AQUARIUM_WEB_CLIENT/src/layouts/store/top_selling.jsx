import { faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { EffectCards } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';
import 'swiper/scss/effect-fade';
import 'swiper/scss/effect-cards';
import { faSellcast } from "@fortawesome/free-brands-svg-icons";

export const TopSelling = () => {
    return (
        <>
            <section className="wrap-hot-product">
                <div className="title-flash-sale">
                    <FontAwesomeIcon icon={faSellcast} />
                    <h1>Combo bán chạy</h1>
                </div>
                <hr className="line-hot-product" />

                <div className="wrap-hot-product-layout">

                    <div className="hot-product-card-layout">
                        <Swiper
                            centeredSlides={true}
                            loop={true}
                            effect={'cards'}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="mySwiperCard"
                        >
                            <SwiperSlide className="hot-product-slide">
                                <div className="-box-hot-product">
                                    <img className="img-hot-product" src="src\assets\img\slide_image\beta.png" alt="" />
                                    <div className="info-hot-product">
                                        <p className="name-hot-product">Combo cá beta</p>
                                        <div className="down-hot-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-hot-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="hot-product-slide">
                                <div className="-box-hot-product">
                                    <img className="img-hot-product" src="src\assets\img\slide_image\beta.png" alt="" />
                                    <div className="info-hot-product">
                                        <p className="name-hot-product">Combo cá beta</p>
                                        <div className="down-hot-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-hot-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="hot-product-slide">
                                <div className="-box-hot-product">
                                    <img className="img-hot-product" src="src\assets\img\slide_image\beta.png" alt="" />
                                    <div className="info-hot-product">
                                        <p className="name-hot-product">Combo cá beta</p>
                                        <div className="down-hot-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-hot-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="hot-product-slide">
                                <div className="-box-hot-product">
                                    <img className="img-hot-product" src="src\assets\img\slide_image\beta.png" alt="" />
                                    <div className="info-hot-product">
                                        <p className="name-hot-product">Combo cá beta</p>
                                        <div className="down-hot-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-hot-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}