/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTag, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Sidebar from '../../layouts/sidebar';
import Header from '../../layouts/header';
import { VoucherLayout } from '../../layouts/voucher/voucher_layout';

export default function Voucher() {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Mã giảm giá</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    <div className="wrap-products">
                        <div className="title_box">
                            <FontAwesomeIcon icon={faTicket} />
                            <h2 className="products-title">Mã giảm giá</h2>
                        </div>

                        <div className="wrap-body-sale">
                            <VoucherLayout />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

