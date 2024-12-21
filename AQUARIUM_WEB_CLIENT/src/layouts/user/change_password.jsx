/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { faBoxOpen, faCoins, faDollar, faGear, faHistory, faKey, faList, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { SideBarUser } from "./sidebar_user"
import { useGetCustomerById } from "../../hooks/useCustomer"
import { encryptAES } from "../../app/security/CryptAES"
import { ChangePasswordValid } from "../../app/valid/authValid"
import { changePassword } from "../../app/api/customer_api"

export const ChangePassword = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const sideBarRef = useRef(null);
    const [customer, setCustomer] = useState();
    const [passBox, setPassBox] = useState({password: '', new_password: '', confirm_password: ''});
    const {data, fetchData, isLoading} = useGetCustomerById();

    const handleOpenSideBar = () => setOpenSideBar(prev => !prev);

    const handleClickOutside = (event) => {
        if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
            handleOpenSideBar(); 
        }
    };

    useEffect(() => {
        if (openSideBar) {
            document.addEventListener("mousedown", handleClickOutside);
        }else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSideBar]);

    useEffect(() => {
        setCustomer(data);
    });

    if (isLoading) return <></>

    const handleChangePassword = () => {
        if (ChangePasswordValid(passBox)) {
            changePassword(passBox);
        }
    }

    return (
        <>
            <div className="wrap-dashboard" ref={sideBarRef}>

                <SideBarUser customer={customer} openSideBar={openSideBar} sideBarRef={sideBarRef} />

                <div className="-dashboard-space" ref={sideBarRef}>
                    <div className="wrap-user-info">
                        <div className="-open-sidebar" onClick={handleOpenSideBar}>
                            <p><FontAwesomeIcon icon={faList} /> Menu</p>
                        </div>
                        <h2>
                            <FontAwesomeIcon icon={faKey} />
                            Đổi mật khẩu
                        </h2>

                        <div className="wrap-user-change-pasword">
                            <label htmlFor="">
                                Mật khẩu hiển tại
                                <input type="password" name="" id="" 
                                    value={passBox?.password}
                                    onChange={(e) => setPassBox({...passBox, password: e.target.value})}
                                />
                            </label>
                            <label htmlFor="">
                                Mật khẩu mới
                                <input type="password" name="" id="" 
                                    value={passBox?.new_password}
                                    onChange={(e) => setPassBox({...passBox, new_password: e.target.value})}
                                />
                            </label>
                            <label htmlFor="">
                                Xác nhận mật khẩu
                                <input type="password" name="" id="" 
                                    value={passBox?.confirm_password}
                                    onChange={(e) => setPassBox({...passBox, confirm_password: e.target.value})}
                                />
                            </label>
                            <div onClick={handleChangePassword}>Đổi mật khẩu</div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </>
    )
}