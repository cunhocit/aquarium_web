import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigationBar from "../../components/navigation";
import Footer from "../../components/footer";
import { Dashboard } from "../../layouts/user/dashboard";


export const User = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet> <title>Thông tin cá nhân</title> </Helmet>

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <div className="wrap-user-page">
                    <Dashboard />
                </div>

                <Footer/>

            </HelmetProvider>
        </>
    )
}