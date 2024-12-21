import { Helmet } from 'react-helmet-async';
import Sidebar from '../../layouts/sidebar';
import ProductsLayout from '../../layouts/products/products_layout';
import Header from '../../layouts/header';
import { useState } from 'react';

export default function Products() {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Products</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
                
                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    <ProductsLayout />
                </div>
            </div>
        </>
    )
}