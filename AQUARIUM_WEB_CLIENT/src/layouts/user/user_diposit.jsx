/* eslint-disable no-unused-vars */
import { faBoxOpen, faCoins, faDollar, faGear, faHistory, faKey, faList, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { SideBarUser } from "./sidebar_user"
import { useGetCustomerById } from "../../hooks/useCustomer"

export const Diposit = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const sideBarRef = useRef(null);
    const [customer, setCustomer] = useState();
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
    }, [openSideBar])

    useEffect(() => {
        setCustomer(data);
    }, [data]);

    if (isLoading) return <></>

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
                            <FontAwesomeIcon icon={faCoins} />
                            Nạp tiền
                        </h2>

                        <div className="wrap-diposit">
                            <img src="public\or_code.png" alt="" />

                            <div>
                                <h4>Chuyển khoản qua mã QR hoặc</h4>
                                <p>- Số tài khoản: 0000 2292 437</p>
                                <p>- Ngân hàng: TP bank</p>
                                <p>- Chủ tài khoản: Le Thanh Loi</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}