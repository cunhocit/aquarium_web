import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigationBar from "../../components/navigation";
import Footer from "../../components/footer";
import { ChangePassword } from "../../layouts/user/change_password";

export const UserChangePassword = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet> <title>Đổi mật khẩu</title> </Helmet>

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <div className="wrap-user-page">
                    <ChangePassword />
                </div>

                <Footer/>

            </HelmetProvider>
        </>
    )
}