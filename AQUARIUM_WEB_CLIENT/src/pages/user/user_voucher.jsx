import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigationBar from "../../components/navigation";
import Footer from "../../components/footer";
import { Voucher } from "../../layouts/user/user_voucher";

export const UserVoucher = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet> <title>Mã giảm giá</title> </Helmet>

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <div className="wrap-user-page">
                    <Voucher />
                </div>

                <Footer/>

            </HelmetProvider>
        </>
    )
}