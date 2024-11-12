import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxes, faShoppingCart, faUsers, faTags, faBoxOpen, faChartBar, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Siderbar() {
    const [selectedItem, setSelectedItem] = useState('dashboard');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    }
    return (
        <>
            <div className="wrap-sidebar">

                <div className="logo">
                    <img src="public\logo-black.png" alt="" />
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
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>

                    <div
                        className={`sidebar-item ${selectedItem === 'customers' ? 'active' : ''}`}
                        onClick={() => handleItemClick('customers')}
                    >
                        <div className="-item">
                            <FontAwesomeIcon icon={faUsers} />
                            <p>Khách hàng</p>
                        </div>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>

                    <div
                        className={`sidebar-item ${selectedItem === 'promotions' ? 'active' : ''}`}
                        onClick={() => handleItemClick('promotions')}
                    >
                        <div className='-item'>
                            <FontAwesomeIcon icon={faTags} />
                            <p>Khuyến mãi</p>
                        </div>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    <div
                        className={`sidebar-item ${selectedItem === 'inventory' ? 'active' : ''}`}
                        onClick={() => handleItemClick('inventory')}
                    >
                        <div className="-item">
                            <FontAwesomeIcon icon={faBoxOpen} />
                            <p>Nhập kho</p>
                        </div>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                    
                    <div
                        className={`sidebar-item ${selectedItem === 'reports' ? 'active' : ''}`}
                        onClick={() => handleItemClick('reports')}
                    >
                        <div className="-item">
                            <FontAwesomeIcon icon={faChartBar} />
                            <p>Báo cáo</p>
                        </div>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                </div>
            </div>
        </>
    )
}