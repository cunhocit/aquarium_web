/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../hooks/useProducts";
import ProductInfoLayout from "../../layouts/products/prd_info_layout";
import Header from "../../layouts/header";
import Sidebar from "../../layouts/sidebar";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductsInfo() {
    const [openSB, setOpenSB] = useState(false);
    const {id} = useParams();
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    const {data, isLoading} = useProducts();
    return (
    <>
        <div className='wrap-home-page'>
            <Helmet><title>Products</title></Helmet>
            <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
            <div className='wrap-work-space'>
                <Header handleOpenSB={handleOpenSB} />
                
                <div className="wrap-products">
                    <div className="title_box">
                        <FontAwesomeIcon icon={faBoxes} />
                        <h2 className="products-title">Sản phẩm</h2>
                    </div>
                    
                    <div className="wrap-prd-info">
                        <ProductInfoLayout data={data} isLoading={isLoading} id={id}/>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}