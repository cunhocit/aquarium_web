/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faStore, faMagnifyingGlass,
         faRightToBracket, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useSidebar } from '../hooks/navigation_hook';

import { Link } from 'react-router-dom';

export default function NavigationBar({handleOpenForm, scrollToAbout}){
    const { sidebarIcon, isSidebarOpen, handleShowSidebar } = useSidebar();

    return (
        <header className="header">
            <div className="wrap-header-contents" >
                <img className="logo" src="/logo-white.png" alt="logo"/>

                <ul className={`nav-ul ${isSidebarOpen ? 'open' : ''}`}>
                    <li>
                        <Link className="index" to="/">
                            <FontAwesomeIcon icon={faHouse} size="sm" />
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <a href='#' className="about" onClick={scrollToAbout}>
                            <FontAwesomeIcon icon={faUser} size="sm" />
                            Giới thiệu
                        </a>
                    </li>
                    <li>
                        <Link className="store" to="/store">
                            <FontAwesomeIcon icon={faStore} size="sm" />
                            Cửa hàng
                        </Link>
                    </li>
                    <li>
                        <input type="checkbox" hidden/>
                        <a className="instruct" href="#">
                            <FontAwesomeIcon icon={faCaretUp} size="lg" />
                            Hướng dẫn
                        </a>
                        <ul>
                            <li><a href="#">Nuôi cá</a></li>
                            <li><a href="#">Chăm cây thủy sinh</a></li>
                            <li><a href="#">Thức ăn cho cá</a></li>
                            <li><a href="#">Setup bể cá</a></li>
                            <li><a href="#">Chăm sóc nước</a></li>
                            <li><a href="#">Một số bệnh thường gặp</a></li>
                        </ul>
                    </li>
                    <li id='search-li'>
                        <div className="search-bar">
                            <input type="text" placeholder="Tìm kiếm"/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </li>
                    <li id='login-btn-li'>
                        <a className="sidebar-login-form" onClick={handleOpenForm}>
                            <FontAwesomeIcon icon={faRightToBracket} />
                            Đăng nhập
                        </a>
                    </li>
                </ul>

                <div className='wrap-login-btn' onClick={handleOpenForm}>
                    <button className="login-btn" type="submit"><p>Đăng nhập</p></button>
                </div>
                
                <div className="wrap-account-menu">
                    <img src="" alt="avatar"/>
                </div>

                <div className="sidebar-btn">
                    <FontAwesomeIcon icon={sidebarIcon} size='2xl' onClick={handleShowSidebar}/>
                </div>
            </div>

            {/* ACCOUNT DROPDOWN MENU */}
            <div className="wrap-dropdown-account-menu">
                <ul className="sidebar-ul">
                    <li><a href="#">Đơn hàng</a></li>
                    <li><a href="#">Lịch sử giao dịch</a></li>
                    <li><a href="#">Cài đặt chung</a></li>
                    <li><a href="#">Đăng xuất</a></li>
                </ul>
            </div>
        </header>
    );
}