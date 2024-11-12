import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import Header from '../layouts/header';
import Sidebar from '../layouts/sidebar';
import usePageSwitch from '../hooks/usePageSwitch';
import Login from '../layouts/login';
import Register from '../layouts/register';
// import { useLoginRegister } from '../hooks/useForm';

export default function MainLayout() {

    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const toggleSidebar = () => {
        setIsOpenSidebar(prevState => !prevState)
    }
    const { setActivePage, renderPage } = usePageSwitch();

    // const { isOpenForm, handleOpenForm } = useLoginRegister();

    return(
        <>
        <div className='wrap-home-page'>

            {/* login */}
            <Login
                // openRegister={handleOpenForm}
                // isOpenForm={isOpenForm}
            />

            <Register
                // openLogin={handleOpenForm} 
                // isOpenForm={isOpenForm}
            />

            {/* title */}
            <Helmet><title>Admin</title></Helmet>

            {/* sidebar */}
            <Sidebar isOpen={isOpenSidebar} hidden={toggleSidebar} setActivePage={setActivePage}/>

            {/* WORK SPACE */}
            <div className='wrap-work-space'>

                {/* header */}
                <Header openSidebar={toggleSidebar} />

                {/* render page */}
                {renderPage()}
            </div>

        </div>
        </>
    )
}