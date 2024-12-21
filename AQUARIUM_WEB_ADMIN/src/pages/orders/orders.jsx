import { Helmet } from 'react-helmet-async';
import Sidebar from '../../layouts/sidebar';
import Header from '../../layouts/header';
import OrdersLayout from '../../layouts/orders/orders_layout';
import { useState } from 'react';

export default function Orders() {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Đơn hàng</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    <OrdersLayout />
                </div>
            </div>
        </>
    )
}