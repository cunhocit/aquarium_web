import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { PostLayout } from "../../layouts/post/post_layout";

export const Post = () => {
    const [openSB, setOpenSB] = useState(false);
    const handleOpenSB = () => {
        setOpenSB(prev => !prev);
    }
    return (
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Products</title></Helmet>
                <Sidebar openSB={openSB} handleOpenSB={handleOpenSB} />

                <div className='wrap-work-space'>
                    <Header handleOpenSB={handleOpenSB} />
                    <PostLayout />
                </div>
            </div>
        </>
    )
}