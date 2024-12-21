import { Helmet } from 'react-helmet-async';
import Sidebar from '../layouts/sidebar';
import DashboardLayout from '../layouts/dashboard/dashboard_layout';
import Header from '../layouts/header';
import { useState } from 'react';

export default function Dashboard() {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Dashboard</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />
                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    <DashboardLayout />
                </div>
            </div>
        </>
    )
}