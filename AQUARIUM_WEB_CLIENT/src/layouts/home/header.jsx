/* eslint-disable react/prop-types */
import NavigationBar from "../../components/navigation"

export const Header = ({scrollToAbout}) => {
    return(
    <>
        <section className="wrap-header">
            <NavigationBar scrollToAbout={scrollToAbout}/>

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
    </>
    )
}