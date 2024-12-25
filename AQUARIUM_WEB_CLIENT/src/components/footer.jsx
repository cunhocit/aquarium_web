import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <>
            <section>
                <footer className="footer">
                    <div className="wrap-footer-contents">
                        <div className="footer-contents">
                            <img className=" footer-item wrap-logo-footer" src="/logo-white.png" alt="logo" />
                    
                            <ul className="footer-item">
                                <li><h2>Liên kết</h2></li>
                                <li><a href="/store">Cửa hàng</a></li>
                                <li><a href="/user">Cá nhân</a></li>
                            </ul>

                            <ul className="footer-item">
                                <li><h2>Theo dõi</h2></li>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">Zalo</a></li>
                                <li><a href="#">TikTok</a></li>
                                <li><a href="#">Youtube</a></li>
                            </ul>

                            <ul className="footer-item">
                                <li><h2>Công cụ</h2></li>
                                <li><a href="#">IntelliJ IDEA - Java</a></li>
                                <li><a href="#">Visual Studio Code</a></li>
                            </ul>
                            
                            <ul className="footer-item">
                                <li><h2>Liên hệ</h2></li>
                                <li className="contacts">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <a >+84 354 337 115</a></li>
                                <li className="contacts">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <a >abc123@gmail.com</a></li>
                            </ul>
                            
                            <ul className="footer-item">
                                <li><h2>Developer</h2></li>
                                <li>
                                    <FontAwesomeIcon icon={faGithub} />
                                    <a>By ThanhLoi</a></li>
                            </ul>
                        </div>

                        <div className='wrap-footer-map'>
                            <iframe
                                title="My address"
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.804545149999!2d108.25339317472792!3d15.971580284693882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314211c272a4f9bb%3A0x6eb1c922b1a0ac34!2zS8OtIHTDumMgeMOhIE1BUlQ!5e0!3m2!1sen!2s!4v1729214271983!5m2!1sen!2s'
                                allowFullScreen
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                                >
                            </iframe>
                        </div>

                        <div className="wrap-copy-right">
                            <p>&copy; 2024 Thế giới cá và thủy sinh | Thiết kế bởi ThanhLoi/Santo</p>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    );
}