import { Helmet, HelmetProvider } from "react-helmet-async"
import NavigationBar from "../components/navigation"
import Footer from "../components/footer"
import { ContactLayout } from "../layouts/contact/contact"

export const Contact = () => {
    return (
        <>
        <HelmetProvider>

            <Helmet> <title>Liên hệ</title> </Helmet>

            <section className="-wrap-navigation">
                <NavigationBar />
            </section>

            <div className="wrap-contact-page">
                <ContactLayout />
            </div>

            <Footer />

        </HelmetProvider>
        </>
    )
}