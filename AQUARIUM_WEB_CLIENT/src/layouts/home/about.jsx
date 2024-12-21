/* eslint-disable react/prop-types */
import { faFacebook, faGithub, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const AboutUs = ({aboutRef, nextSection}) => {
    return (
    <>
        <section className="wrap-about-us-header" ref={aboutRef}>
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
                            <a id="next-slide-show-id" onClick={nextSection}>Tiếp tục</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}