/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStore, faMagnifyingGlass,
         faRightToBracket, faPhone,
         faIndustry} from '@fortawesome/free-solid-svg-icons';
import { useSidebar } from '../hooks/navigation';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetProducts } from '../hooks/useProduct';
import { useGetCustomerById } from '../hooks/useCustomer';

// localStorage.clear()

export default function NavigationBar(){
    const navigate = useNavigate();
    const { sidebarIcon, isSidebarOpen, handleShowSidebar } = useSidebar();
    const JWT_TOKEN = localStorage.getItem('jwt_token_customer');
    const {data: customer, fetchData: fetchData2, isLoading: isLoading2} = useGetCustomerById();
    const {data, fetchData, isLoading} = useGetProducts();
    const [search, setSearch] = useState('');

    const dataFilter = data?.products?.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchEnter = (e) => {
        if (e.key === 'Enter' && search != '') {
            if (!localStorage.getItem('jwt_token_customer')) {
                alert('Vui lòng đăng đăng nhập để tìm kiếm');
                return;
            }
            navigate(`/search/${search}`);
        }
    };


    return (
        <header className="header">
            <div className="wrap-header-contents">
                <img className="logo" src="/logo-white.png" alt="logo"/>

                <ul className={`nav-ul ${isSidebarOpen ? 'open' : ''}`}>
                    <li>
                        <Link className="index" to="/">
                            <FontAwesomeIcon icon={faHouse} size="sm" />
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link className="store" to="/store">
                            <FontAwesomeIcon icon={faStore} size="sm" />
                            Cửa hàng
                        </Link>
                    </li>
                    <li>
                        <Link className="instruct" to="/post/abc">
                            <FontAwesomeIcon icon={faIndustry} size="sm" />
                            Hướng dẫn
                        </Link>
                    </li>
                    <li>
                        <Link className="instruct" to="/contact">
                            <FontAwesomeIcon icon={faPhone} size="sm" />
                            Liên hệ
                        </Link>
                    </li>
                    <li id='search-li'>
                        <div className="search-bar">
                            <input type="text" placeholder="Tìm kiếm"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={handleSearchEnter}
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <div className='-result-search' style={{display: search === '' ? 'none' : 'flex'}}>
                            {dataFilter?.map(e => (
                                <div key={e.id}><Link to={`/product/${e.id}`}>{e.name}</Link></div>
                            ))}
                        </div>
                    </li>
                    <li id='login-btn-li' style={{display: JWT_TOKEN ? 'none' : 'flex'}}>
                        <Link to={'/login'}>
                            <FontAwesomeIcon icon={faRightToBracket} />
                            Đăng nhập
                        </Link>
                    </li>
                    <li className="wrap-account-menu-2" style={{display: JWT_TOKEN ? 'flex' : 'none'}}>
                        <div>
                            <h4>{customer?.name}</h4>
                            <Link to={'/user'}>Thông tin cá nhân</Link>
                        </div>
                        <img src={`http://localhost:8080/api/customers/images/${customer?.image ? customer?.image : 'image.png'}`} alt="avatar"/>
                    </li>
                </ul>

                <div className="sidebar-btn">
                    <FontAwesomeIcon icon={sidebarIcon} size='2xl' onClick={handleShowSidebar}/>
                </div>
            </div>
        </header>
    );
}