import { Helmet, HelmetProvider } from "react-helmet-async";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/css/pagination';
import 'swiper/scss/effect-fade';
import 'swiper/scss/effect-cards';
import { Navigation, Autoplay, EffectCards } from 'swiper/modules';

import NavigationBar from "../components/navigation";
import Footer from "../components/footer";
import LoginForm from '../components/login_form';
import RegisterForm from "../components/register_form";
import ClockCountdown from "../components/countdown";

import { useOpenForm } from "../hooks/navigation_hook";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudBolt, faTags, faStar } from '@fortawesome/free-solid-svg-icons';

export default function Store() {

    const { isOpenLoginForm, isOpenRegisterForm,
        handleOpenLoginForm, handleOpenRegisterForm } = useOpenForm();

    return(
        <HelmetProvider>
            <div className="wrap-body-store">
                <Helmet>
                    <title>Cửa hàng cá và thủy sinh</title>
                </Helmet>

                {/* LOGIN FORM */}
                <LoginForm isOpen={isOpenLoginForm} handleOpenForm={handleOpenLoginForm} handleOpenRigister={handleOpenRegisterForm} />

                {/* REGISTER FORM */}
                <RegisterForm isOpen={isOpenRegisterForm} handleOpenForm={handleOpenRegisterForm} handleLoginForm={handleOpenLoginForm} />

                
                <section className="body-store">
                <NavigationBar handleOpenForm={handleOpenLoginForm}/>

                    <div className="insert_navigation"></div>

                    {/* HEADER */}
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

                        <div className="wrap-directory">
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
                                <SwiperSlide className="swiper-slide-directory">
                                    <img src="/src/assets/img/store_poster/cabeta.png" alt="" />
                                    <p>Cá betta</p>
                                </SwiperSlide>

                                <SwiperSlide className="swiper-slide-directory">
                                    <img src="/src/assets/img/store_poster/cavang.png" alt="" />
                                    <p>Cá vàng</p>
                                </SwiperSlide>

                                <SwiperSlide className="swiper-slide-directory">
                                    <img src="/src/assets/img/store_poster/tepcanh.png" alt="" />
                                    <p>Tép cảnh</p>
                                </SwiperSlide>

                                <SwiperSlide className="swiper-slide-directory">
                                    <img src="/src/assets/img/store_poster/luathuysinh.png" alt="" />
                                    <p>Lũa thủy sinh</p>
                                </SwiperSlide>

                                <SwiperSlide className="swiper-slide-directory">
                                    <img src="/src/assets/img/store_poster/phannen.png" alt="" />
                                    <p>Phân nền thủy sinh</p>
                                </SwiperSlide>

                                <SwiperSlide className="swiper-slide-directory">
                                    <img src="/src/assets/img/store_poster/maylocnuoc.png" alt="" />
                                    <p>Bộ lọc nước</p>
                                </SwiperSlide>

                                <SwiperSlide className="swiper-slide-directory">
                                    <img src="/src/assets/img/store_poster/denchieu.png" alt="" />
                                    <p>Đèn chiếu thủy sinh</p>
                                </SwiperSlide>

                                <SwiperSlide className="swiper-slide-directory">
                                    <img src="/src/assets/img/store_poster/vatlieuloc.png" alt="" />
                                    <p>Vật liệu lọc</p>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </section>

                {/* FLASH SALE */}
                <section className="wrap-flash-sale">
                    <div className="title-flash-sale">
                            <FontAwesomeIcon icon={faCloudBolt} />
                            <h1>FLASH SALE</h1>
                            <ClockCountdown />
                        </div>

                        <div className="list-flash-sale">
                            <Swiper
                                centeredSlides={true}
                                grabCursor={true}
                                loop={true}
                                speed={1000}
                                breakpoints={{
                                    0: {
                                      slidesPerView: 3,
                                      spaceBetween: 10,
                                    },
                                    481: {
                                        slidesPerView: 4,
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
                                <SwiperSlide className="swiper-slide-flash-sale">
                                    <div className="box-product">
                                        <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                        <div className="info-product">
                                            <p className="name-product">Combo cá beta</p>
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-20%</p>
                                                <p><s>150.000<u>đ</u></s></p>
                                            </div>
                                            <div className="price-product">
                                                <p>99.000<u>đ</u></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-flash-sale">
                                    <div className="box-product">
                                        <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                        <div className="info-product">
                                            <p className="name-product">Combo cá beta</p>
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-20%</p>
                                                <p><s>150.000<u>đ</u></s></p>
                                            </div>
                                            <div className="price-product">
                                                <p>99.000<u>đ</u></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-flash-sale">
                                    <div className="box-product">
                                        <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                        <div className="info-product">
                                            <p className="name-product">Combo cá beta</p>
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-20%</p>
                                                <p><s>150.000<u>đ</u></s></p>
                                            </div>
                                            <div className="price-product">
                                                <p>99.000<u>đ</u></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-flash-sale">
                                    <div className="box-product">
                                        <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                        <div className="info-product">
                                            <p className="name-product">Combo cá beta</p>
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-20%</p>
                                                <p><s>150.000<u>đ</u></s></p>
                                            </div>
                                            <div className="price-product">
                                                <p>99.000<u>đ</u></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-flash-sale">
                                    <div className="box-product">
                                        <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                        <div className="info-product">
                                            <p className="name-product">Combo cá beta</p>
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-20%</p>
                                                <p><s>150.000<u>đ</u></s></p>
                                            </div>
                                            <div className="price-product">
                                                <p>99.000<u>đ</u></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-flash-sale">
                                    <div className="box-product">
                                        <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                        <div className="info-product">
                                            <p className="name-product">Combo cá beta</p>
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-20%</p>
                                                <p><s>150.000<u>đ</u></s></p>
                                            </div>
                                            <div className="price-product">
                                                <p>99.000<u>đ</u></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-flash-sale">
                                    <div className="box-product">
                                        <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                        <div className="info-product">
                                            <p className="name-product">Combo cá beta</p>
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-20%</p>
                                                <p><s>150.000<u>đ</u></s></p>
                                            </div>
                                            <div className="price-product">
                                                <p>99.000<u>đ</u></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper-slide-flash-sale">
                                    <div className="box-product">
                                        <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                        <div className="info-product">
                                            <p className="name-product">Combo cá beta</p>
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-20%</p>
                                                <p><s>150.000<u>đ</u></s></p>
                                            </div>
                                            <div className="price-product">
                                                <p>99.000<u>đ</u></p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                </section>

                <section className="wrap-hot-product">
                    <div className="title-flash-sale">
                        <FontAwesomeIcon icon={faStar} />
                        <h1>TÌM KIẾM NHIỀU NHẤT</h1>
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
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        
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
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        
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
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        
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
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                                <SwiperSlide className="hot-product-slide">
                                    <img className="img-hot-product" src="/src/assets/img/slide_image/image2.png" alt="" />
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
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </section>

                <section className="wrap-show-product-list">
                    <div className="title-show-product">
                        <p>Gợi ý cho bạn</p>
                        <hr />
                    </div>

                    <div className="util-wrap-list-product">
                        <div className="wrap-list-product">

                            <div className="wrap-info-product">
                                <div className="box-product">
                                    <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                    <div className="info-product">
                                        <p className="name-product">Combo cá beta</p>
                                        <div className="down-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="wrap-info-product">
                                <div className="box-product">
                                    <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                    <div className="info-product">
                                        <p className="name-product">Combo cá beta</p>
                                        <div className="down-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap-info-product">
                                <div className="box-product">
                                    <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                    <div className="info-product">
                                        <p className="name-product">Combo cá beta</p>
                                        <div className="down-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap-info-product">
                                <div className="box-product">
                                    <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                    <div className="info-product">
                                        <p className="name-product">Combo cá beta</p>
                                        <div className="down-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap-info-product">
                                <div className="box-product">
                                    <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                    <div className="info-product">
                                        <p className="name-product">Combo cá beta</p>
                                        <div className="down-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap-info-product">
                                <div className="box-product">
                                    <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                    <div className="info-product">
                                        <p className="name-product">Combo cá beta</p>
                                        <div className="down-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap-info-product">
                                <div className="box-product">
                                    <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                    <div className="info-product">
                                        <p className="name-product">Combo cá beta</p>
                                        <div className="down-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="explore-btn"><p>Xem thêm</p></div>
                </section>

                <section>
                    <Footer />
                </section>
            </div>
        </HelmetProvider>
    );
}