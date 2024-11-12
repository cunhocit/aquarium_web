import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

import 'swiper/scss';
import 'swiper/scss/effect-coverflow';
import 'swiper/scss/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import { useOpenForm } from "../hooks/navigation_hook";
import Footer from "../components/footer";
import NavigationBar from "../components/navigation";
import LoginForm from '../components/login_form';
import RegisterForm from "../components/register_form";

export default function Home() {
    // tham chiếu đến section slide show
    const aboutRef = useRef(null); 
    const slideShowRef = useRef(null);

    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const scrollToSwiper = () => {
        slideShowRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const { isOpenLoginForm, isOpenRegisterForm,
        handleOpenLoginForm, handleOpenRegisterForm } = useOpenForm();

    return (
        <HelmetProvider>
            <div className="wrap-contents">
                <Helmet>
                    <title>Thế giới cá và thủy sinh</title>
                </Helmet>

                {/* LOGIN FORM */}
                <LoginForm isOpen={isOpenLoginForm} handleOpenForm={handleOpenLoginForm} handleOpenRigister={handleOpenRegisterForm} />

                {/* REGISTER FORM */}
                <RegisterForm isOpen={isOpenRegisterForm} handleOpenForm={handleOpenRegisterForm} handleLoginForm={handleOpenLoginForm} />

                {/* HEADER */}
                <section className="wrap-header">
                    {/* NAVIGATION BAR */}
                    <NavigationBar handleOpenForm={handleOpenLoginForm} scrollToAbout={scrollToAbout} />

                    <div className="header-contents">
                        <div className="contents-list">
                            <h1>Thế Giới Cá và Thủy Sinh</h1>
                            <p>Khám phá vẻ đẹp và sự kỳ diệu của thế giới dưới nước. 
                                Từ những loài cá đa dạng đến các hệ sinh thái thủy sinh phong phú, chúng tôi mang đến cho bạn những thông tin và kiến thức bổ ích nhất.</p>
                        </div>
                        <a id="header-down-id" onClick={scrollToAbout}>Khám phá</a>
                    </div>

                    <video autoPlay loop muted playsInline className="header-bg-video">
                        <source src="src/assets/video/video_1.mp4" type="video/mp4" />
                    </video>
                </section>

                {/* ABOUT */}
                <section className="wrap-about-us-header"  ref={aboutRef}>
                    <video autoPlay loop muted playsInline className="header-bg-video">
                        <source src="src/assets/video/video_2.mp4" type="video/mp4" />
                    </video>

                    <div className="wrap-header-content">
                        <div className="about-us-img">
                            <img src="src/assets/img/avt.png" alt="" />
                        </div>

                        <div className="about-us-content">
                            <div className="wrap-about-us-text">
                                <h1>Xin chào, tôi là <span>Santo</span></h1>
                                <h3>Sinh viên tại <span>VKU</span></h3>
                                <p>Đây là một dự án web về chủ đề Cá và Thủy sinh mà tôi thực hiện. 
                                    Website cung cấp thông tin về các dòng cá cảnh và cây thủy sinh, chia sẻ kiến thức để phát triển cộng đồng thủy sinh.</p>
                                <div className="social-icons">
                                    <Link href=""><FontAwesomeIcon icon={faFacebook} /></Link>
                                    <Link href=""><FontAwesomeIcon icon={faInstagram} /></Link>
                                    <Link href=""><FontAwesomeIcon icon={faGithub} /></Link>
                                    <Link href=""><FontAwesomeIcon icon={faYoutube} /></Link>
                                </div>
                                <div className="about-us-next" >
                                    <a id="next-slide-show-id" onClick={scrollToSwiper}>Tiếp tục</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* SLIDE SHOW */}
                <section className="wrap-slide-show" ref={slideShowRef}>
                    <div className="wrap-swiper">
                        <h1>Khám phá hệ sinh thái dưới nước</h1>
                        <Swiper 
                            effect={'coverflow'}
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

                            pagination={{
                                dynamicBullets: true
                            }}
                            modules={[EffectCoverflow, Pagination, Autoplay]}
                            className="mySwiper swiper-slide-show slide-show-effect"
                        >
                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/7_mau.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/beta.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/sac_gam.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/image1.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/image2.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/beo_nhat.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/rau_ma_du.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/tieu_bao_thap.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/image3.png" alt="" /></SwiperSlide>

                            <SwiperSlide className="swiper_slide">
                                <img src="src/assets/img/slide_image/image4.png" alt="" /></SwiperSlide>
                        </Swiper>
                    </div>
                </section>

                {/* TIPS */}
                <section className="wrap-tips">
                    <div className="tips">
                        <h1>Có thể bạn sẽ cần!</h1>
                        <ul className="tips-ul">
                            <li>
                                <img className="tips-img" src="src/assets/img/tips/image1.png" alt="" />
                                <div className="tips-text">
                                    <h2>Chăm sóc cá</h2>
                                    <p>Để cá luôn khỏe mạnh, bạn cần chú ý đến chế độ ăn uống, môi trường sống và thường xuyên kiểm tra chất lượng nước trong bể.</p>
                                </div>
                                <div className="nextPage_btn"><a href="#"><p>Tìm hiểu</p>
                                    <FontAwesomeIcon icon={faArrowRight} /></a></div>
                            </li>
                            <li>
                                <img className="tips-img" src="src/assets/img/tips/image3.png" alt="" />
                                <div className="tips-text">
                                    <h2>Chăm sóc cây</h2>
                                    <p>Các cây thủy sinh cần ánh sáng phù hợp, dinh dưỡng và nên được cắt tỉa thường xuyên để phát triển tốt và không gây hại cho cá.</p>
                                </div>
                                <div className="nextPage_btn"><a href="#"><p>Tìm hiểu</p>
                                    <FontAwesomeIcon icon={faArrowRight} /></a></div>
                            </li>
                            <li>
                                <img className="tips-img" src="src/assets/img/tips/image.png" alt="" />
                                <div className="tips-text">
                                    <h2>Setup bể cá</h2>
                                    <p>Khi setup bể cá, hãy chọn kích thước bể phù hợp, bố trí cây và đá một cách hài hòa và đảm bảo hệ thống lọc hoạt động hiệu quả.</p>
                                </div>
                                <div className="nextPage_btn"><a href="#"><p>Tìm hiểu</p>
                                    <FontAwesomeIcon icon={faArrowRight} /></a></div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* FOOTER */}
                <section>
                    <Footer/>
                </section>
            </div>
        </HelmetProvider>
    );
}