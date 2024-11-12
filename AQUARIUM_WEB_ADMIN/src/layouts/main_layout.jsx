import { Helmet } from 'react-helmet-async';

import Header from '../components/header';
import Siderbar from '../components/sidebar';
import Dashboard from './dashboard';

export default function MainLayout() {
    return(
        <>
        <div className='wrap-home-page'>

            {/* title */}
            <Helmet><title>Dashboard</title></Helmet>

            {/* sidebar */}
            <Siderbar/>

            {/* WORK SPACE */}
            <div className='wrap-work-space'>

                {/* header */}
                <Header/>

                {/* dashboard */}
                <Dashboard/>
            </div>

        </div>
        </>
    )
}