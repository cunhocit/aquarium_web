/* eslint-disable no-unused-vars */
import { Helmet, HelmetProvider } from "react-helmet-async"
import Footer from "../components/footer"
import NavigationBar from "../components/navigation"
import { ListOrder } from "../layouts/payment/list_order"
import { ProductRelated } from "../layouts/product_detail/product_related"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProductDetailById, useGetProducts } from "../hooks/useProduct"
import { CartProvider } from "../components/cart_contetn"


export const Payment = () => {
    const {data, fetchData, isLoading} = useGetProducts();
    
    if (isLoading) return <></>

    return (
        <>
            <HelmetProvider>

                <Helmet> <title>Thanh toán</title> </Helmet>

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <CartProvider>
                    <div className="wrap-payment-page">

                        <ListOrder />

                        <ProductRelated products={data}/>

                    </div>
                </CartProvider>

                <Footer/>

            </HelmetProvider>
        </>
    )
}