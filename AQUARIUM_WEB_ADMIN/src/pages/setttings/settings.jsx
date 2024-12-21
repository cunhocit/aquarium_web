/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import Sidebar from '../../layouts/sidebar';
import Header from '../../layouts/header';
import SettingsLayout from '../../layouts/settings/setting_layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Settings() {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Cài đặt</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
                <div className='wrap-work-space'>
                    <div className="wrap-settings">
                        <Header handleOpenSB={handleOpenSB} />

                        <div className="title_box">
                            <FontAwesomeIcon icon={faGear} />
                            <h2 className="products-title">Cài đặt</h2>
                        </div>

                        <div className="wrap-body-settings">
                            <SettingsLayout />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

