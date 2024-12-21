/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faBoxOpen, faCoins, faDollar, faKey, faSignOut, faTag, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { updateAvatar } from "../../app/api/customer_api"

export const SideBarUser = ({openSideBar, sideBarRef, customer, fetchData}) => {
    const imageRef = useRef(null);

    const handleClickFileDialog = () => imageRef.current.click();

    const handelLogout = () => {
        console.log('logout');
        
        localStorage.clear();
        window.location.reload();
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const cus_id = localStorage.getItem('cus_id');
        if (selectedFile && cus_id) {
            await updateAvatar({
                id: cus_id,
                file: selectedFile
            }).then(
                data => {
                    if (data.message) {
                        fetchData();
                    }
                }
            ).catch(error => {
                console.log("error: ", error);
                throw error;
            })
        }
    }

    return (<>
        <div className={`-dashboard-sidebar ${openSideBar ? 'open' : ''}`} ref={sideBarRef}>
            <div className="-avatar-box">
                <img src={`http://localhost:8080/api/customers/images/${customer?.image ? customer?.image : 'image.png'}`} alt="" />
                <div>
                    <p>{customer?.name}</p>
                    <input type="file" hidden ref={imageRef} onChange={handleFileChange}/>
                    <p className="-change-avatar" onClick={handleClickFileDialog}>Đổi avatar</p>
                </div>
            </div>

            <hr />

            <div className="-sidebar-list">
                <ul>
                    <li><FontAwesomeIcon icon={faCoins} />{customer?.balance.toLocaleString('vi-VN')} đ</li>
                    <li><Link to={'/user'}><FontAwesomeIcon icon={faUser} />Thông tin</Link></li>
                    <li><Link to={'/user_orders'}><FontAwesomeIcon icon={faBoxOpen} />Đơn hàng</Link></li>
                    <li><Link to={'/user_change_password'}><FontAwesomeIcon icon={faKey} />Đổi mật khẩu</Link></li>
                    <li><Link to={'/user_voucher'}><FontAwesomeIcon icon={faTag} />Mã giảm giá</Link></li>
                    <li><Link to={'/user_diposit'}><FontAwesomeIcon icon={faDollar} />Nạp tiền</Link></li>
                    <li onClick={() => handelLogout()}><FontAwesomeIcon icon={faSignOut} />Đăng xuất</li>
                </ul>
            </div>
        </div>
    </>)
}