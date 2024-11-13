/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxes, faShoppingCart, faUsers, faArrowLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Sidebar({isOpen, hidden, setActivePage}) {
    const [selectedItem, setSelectedItem] = useState('dashboard');

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setActivePage(item);
    }
    return (
        <>
            <div className={`wrap-sidebar ${isOpen ? 'open' : ''}`}>

                <div className="logo">
                    <img src="public/logo-black.png" alt="" />
                </div>

                <div className={`hideSidebar ${isOpen ? 'openSb' : ''}`} >
                    <FontAwesomeIcon icon={faArrowLeft} onClick={hidden}/>
                </div>

                <div className="wrap-action-sidebar">
                    <div className={`sidebar-item ${selectedItem === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleItemClick('dashboard')}
                    >
                        <div className='-item'>
                            <FontAwesomeIcon icon={faHome} />
                            <p>Dashboard</p>
                        </div>
                    </div>

                    <div>
                        <div
                            className={`sidebar-item ${selectedItem === 'products' ? 'active' : ''}`}
                            onClick={() => handleItemClick('products')}
                        >
                            <div className="-item">
                                <FontAwesomeIcon icon={faBoxes} />
                                <p>Sản phẩm</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`sidebar-item ${selectedItem === 'orders' ? 'active' : ''}`}
                        onClick={() => handleItemClick('orders')}
                    >
                        <div className="-item">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <p>Đơn hàng</p>
                        </div>
                    </div>

                    <div
                        className={`sidebar-item ${selectedItem === 'customers' ? 'active' : ''}`}
                        onClick={() => handleItemClick('customers')}
                    >
                        <div className="-item">
                            <FontAwesomeIcon icon={faUsers} />
                            <p>Khách hàng</p>
                        </div>
                    </div>
                    
                    <div
                        className={`sidebar-item ${selectedItem === 'settings' ? 'active' : ''}`}
                        onClick={() => handleItemClick('settings')}
                    >
                        <div className="-item">
                            <FontAwesomeIcon icon={faGear} />
                            <p>Cài đặt</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}