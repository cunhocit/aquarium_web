/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faMoon, faCoffee } from '@fortawesome/free-solid-svg-icons';

export default function Header({openSidebar}) {
    return (
        <>
        <div className="wrap-header">   

            <div className='showSidebar' onClick={openSidebar}>
                <FontAwesomeIcon icon={faCoffee} />
            </div>

            <div className="search-bar">
                <input type="text" placeholder='Tìm kiếm' />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>

            <div className='wrap-action-header'>
                <div className='theme-svg'>
                    <FontAwesomeIcon icon={faMoon} />
                </div>

                <div className='announcement-svg'>
                    <FontAwesomeIcon icon={faBell} />
                </div>

                <div className='admin-avatar'>
                    <p>cunhocit</p>
                    <img src="public/vite.svg" alt="" />
                </div>
            </div>

        </div>
        </>
    )
}