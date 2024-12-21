/* eslint-disable no-unused-vars */
import { Helmet, HelmetProvider } from "react-helmet-async";
import Footer from "../components/footer";
import { Header } from "../layouts/home/header";
import { AboutUs } from "../layouts/home/about";
import { SlideShow } from "../layouts/home/slide_show";
import { Tips } from "../layouts/home/tips";
import { useRef } from "react";

export default function Home() {
    const aboutRef = useRef(null);
    const slideShowRef = useRef(null);
    const slideTipsRef = useRef(null);

    const scrollToSlideShow = () => {
        slideShowRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollToTips = () => {
        slideTipsRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <HelmetProvider>
            <Helmet> <title>Thế giới cá và thủy sinh</title> </Helmet>

            <div className="wrap-contents">

                <Header scrollToAbout={scrollToAbout}/>

                <AboutUs aboutRef={aboutRef} nextSection={scrollToSlideShow} />
                
                <SlideShow slideShowRef={slideShowRef} nextSection={scrollToTips}/>

                <Tips slideTipsRef={slideTipsRef}/>

                <Footer />

            </div>

        </HelmetProvider>
    );
}