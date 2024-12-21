import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigationBar from "../../components/navigation";
import Footer from "../../components/footer";
import { Diposit } from "../../layouts/user/user_diposit";

export const UserDiposit = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet> <title>Nạp tiền</title> </Helmet>

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <div className="wrap-user-page">
                    <Diposit />
                </div>

                <Footer/>

            </HelmetProvider>
        </>
    )
}