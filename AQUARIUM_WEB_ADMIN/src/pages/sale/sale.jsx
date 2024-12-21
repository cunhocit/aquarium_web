/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import Sidebar from '../../layouts/sidebar';
import Header from '../../layouts/header';
import SettingsLayout from '../../layouts/settings/setting_layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTag } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { SaleLayout } from '../../layouts/sale/sale_layout';

export default function Sale() {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Khuyến mãi</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    <div className="wrap-products">
                        <div className="title_box">
                            <FontAwesomeIcon icon={faTag} />
                            <h2 className="products-title">Khuyến mãi</h2>
                        </div>

                        <div className="wrap-body-sale">
                            <SaleLayout />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

