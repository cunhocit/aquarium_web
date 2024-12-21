import { Helmet } from 'react-helmet-async';
import Sidebar from '../../layouts/sidebar';
import Header from '../../layouts/header';
import { useState } from 'react';
import AddPrd from '../../layouts/products/add_prd_layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes } from '@fortawesome/free-solid-svg-icons';

export default function AddProduct() {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Sản phẩm</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />

                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    <div className="wrap-products">
                        <div className="title_box">
                            <FontAwesomeIcon icon={faBoxes} />
                            <h2 className="products-title">Sản phẩm</h2>
                        </div>
                        <AddPrd />
                    </div>
                </div>
            </div>
        </>
    )
}