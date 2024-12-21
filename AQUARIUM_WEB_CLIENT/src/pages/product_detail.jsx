/* eslint-disable no-unused-vars */
import { Helmet, HelmetProvider } from "react-helmet-async"
import NavigationBar from "../components/navigation"
import Footer from "../components/footer"
import { ProducInfo } from "../layouts/product_detail/product_info"
import { Comment } from "../layouts/product_detail/comment"
import { ProductRelated } from "../layouts/product_detail/product_related"
import { ShoppingCartFinal } from "../components/shopping_cart_final"
import { useParams } from "react-router-dom"
import { useGetProductDetailById } from "../hooks/useProduct"
import { CartProvider } from "../components/cart_contetn"

export const ProductDetail = () => {
    const {id} = useParams();
    const {data, fetchData, isLoading, data2, fetchData2, fetchData3, products} = useGetProductDetailById(id);

    if (isLoading) return <></>
    
    return (
        <>
            <HelmetProvider>
                <Helmet> <title>Chi tiết sản phẩm</title> </Helmet>

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <CartProvider>
                    <ShoppingCartFinal/>

                    <div className="wrap-product-detail-page">

                        <ProducInfo product={data} data2={data2} />

                        <Comment data2={data2} id={id}/>

                        <ProductRelated products={products} />

                    </div>
                </CartProvider>

                
                <Footer/>

            </HelmetProvider>
        </>
    )
}