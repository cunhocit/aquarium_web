/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxes, faShoppingCart, faUsers, faArrowLeft, faGear, faCoffee, faLeaf, faBook, faTag, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Sidebar({openSB, handleOpenSB}) {
    const sidebarRef = useRef(null);

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            handleOpenSB();
        }
    }

    useEffect(() => {
        if (openSB) {
            document.addEventListener("mousedown", handleClickOutside);
        }else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSB])

    return (
        <>
            <div className={`wrap-sidebar ${openSB ? 'open' : ''}`} ref={sidebarRef}>

                <div className="logo">
                    <FontAwesomeIcon icon={faLeaf} />
                </div>

                <div className={`hideSidebar ${openSB ? 'openSb' : ''}`} onClick={handleOpenSB} >
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </div>

                <div className="wrap-action-sidebar">

                    <Link to={'/'}>
                        <div className='sidebar-item'>
                            <div className='-item'>
                                <FontAwesomeIcon icon={faHome} />
                                <p>Trang chủ</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/products'}>
                        <div className='sidebar-item' >
                            <div className="-item">
                                <FontAwesomeIcon icon={faBoxes} /><p>Sản phẩm</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/orders'}>
                        <div className='sidebar-item' >
                            <div className="-item">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <p>Đơn hàng</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/customer'}>
                        <div className='sidebar-item' >
                            <div className="-item">
                                <FontAwesomeIcon icon={faUsers} />
                                <p>Khách hàng</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/sale'}>
                        <div className='sidebar-item' >
                            <div className="-item">
                                <FontAwesomeIcon icon={faTag} />
                                <p>Khuyến mãi</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/voucher'}>
                        <div className='sidebar-item' >
                            <div className="-item">
                                <FontAwesomeIcon icon={faTicket} />
                                <p>Mã giảm giá</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={'/post'}>
                        <div className='sidebar-item' >
                            <div className="-item">
                                <FontAwesomeIcon icon={faBook} />
                                <p>Bài viết</p>
                            </div>
                        </div>
                    </Link>
                    
                    <Link to={'/settings'}>
                        <div className='sidebar-item' >
                            <div className="-item">
                                <FontAwesomeIcon icon={faGear} />
                                <p>Cài đặt</p>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}