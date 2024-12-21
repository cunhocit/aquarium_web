import { Helmet } from 'react-helmet-async';
import Sidebar from '../../layouts/sidebar';
import Header from '../../layouts/header';
import { useState } from 'react';
import OrderInfoLayout from '../../layouts/orders/order_info_layout';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function OrderInfo() {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    const {id} = useParams();
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Đơn hàng</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    <div className="wrap-orders">
                        <div className="title_box">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <h2 className="products-title">Đơn hàng</h2>
                        </div>
                        <OrderInfoLayout id={id}/>
                    </div>
                </div>
            </div>
        </>
    )
}