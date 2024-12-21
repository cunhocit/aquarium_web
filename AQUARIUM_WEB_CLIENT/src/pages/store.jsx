/* eslint-disable no-unused-vars */
import { Helmet, HelmetProvider } from "react-helmet-async";

import NavigationBar from "../components/navigation";
import Footer from "../components/footer";
import { Banner } from "../layouts/store/banner";
import { FlashSale } from "../layouts/store/flash_sale";
import { TopSelling } from "../layouts/store/top_selling";
import { ShowProductList } from "../layouts/store/show_product_list";
import { ShoppingCartFinal } from "../components/shopping_cart_final";
import { useGetProducts } from "../hooks/useProduct";
import { CartProvider } from "../components/cart_contetn";

export default function Store() {
    const {data, fetchData, isLoading} = useGetProducts();
    if (isLoading) return <></>


    return(
        <HelmetProvider>
            <Helmet> <title>Cửa hàng cá và thủy sinh</title> </Helmet>

            <div className="wrap-body-store">

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <CartProvider>
                    <ShoppingCartFinal />

                    <Banner data={data} />

                    <FlashSale data={data} />

                    {/* <TopSelling /> */}

                    <ShowProductList data={data} />
                </CartProvider>

                <Footer />
            </div>
        </HelmetProvider>
    );
}