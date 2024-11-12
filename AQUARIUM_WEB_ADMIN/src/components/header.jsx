import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faMoon, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Header() {

    const [isDropDown, setDropDown] = useState(false);
    const toggleDropDown = () => {
        setDropDown(prevState => !prevState);
    }

    return (
        <>
        <div className="wrap-header">

            <div className="search-bar">
                <input type="text" placeholder='Tìm kiếm' />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>

            <div className='wrap-action-header' onClick={toggleDropDown} >
                <div className='theme-svg'>
                    <FontAwesomeIcon icon={faMoon} />
                </div>

                <div className='announcement-svg'>
                    <FontAwesomeIcon icon={faBell} />
                </div>

                <div className='admin-avatar'>
                    <img src="public\vite.svg" alt="" />
                    <p>cunhocit</p>
                    <FontAwesomeIcon icon={faAngleDown}/>
                </div>
            </div>

        </div>

        <div className={`admin-drop-down-menu ${isDropDown ? 'open' : '' }`}>
            <div className='ad-drop-down-content'>
                <h4>cunhocit</h4>
                <p>Adminstrator</p>
                <hr />
                <a href="#">Cài đặt</a>
                <a href="#">Đăng xuất</a>
            </div>
        </div>
        </>
    )
}