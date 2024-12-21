import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigationBar from "../../components/navigation";
import Footer from "../../components/footer";
import { Orders } from "../../layouts/user/user_order";

export const UserOrders = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet> <title>Đơn hàng</title> </Helmet>

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <div className="wrap-user-page">
                    <Orders />
                </div>

                <Footer/>

            </HelmetProvider>
        </>
    )
}