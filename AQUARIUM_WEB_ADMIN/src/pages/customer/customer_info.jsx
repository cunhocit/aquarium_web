/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async"
import Sidebar from "../../layouts/sidebar"
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/header";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomerInfoLayout from "../../layouts/customers/custm_info_layout";

export const CustomerInfo = () => {
    const [openSB, setOpenSB] = useState(false);
    const {id} = useParams();
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Chi tiết khách hàng</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    
                    <div className="wrap-products">
                        <div className="title_box">
                            <FontAwesomeIcon icon={faUser} />
                            <h2 className="products-title">Khách hàng</h2>
                        </div>
                        
                        <div className="wrap-prd-info">
                            <CustomerInfoLayout id={id}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}