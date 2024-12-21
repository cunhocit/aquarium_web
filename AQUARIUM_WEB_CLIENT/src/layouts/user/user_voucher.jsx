/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { faBoxOpen, faCoins, faDollar, faGear, faHistory, faKey, faList, faSignOut, faTag, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { SideBarUser } from "./sidebar_user"
import { useGetCustomerById } from "../../hooks/useCustomer"
import { useGetVouchers } from "../../hooks/useVoucher"
import { claimVoucher } from "../../app/api/voucher_api"

export const Voucher = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const sideBarRef = useRef(null);
    const [customer, setCustomer] = useState();
    const {data, fetchData, isLoading} = useGetCustomerById();
    const {vouchers, fetchVouchers, isLoadingVouchers} = useGetVouchers();

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

    if (isLoading || isLoadingVouchers) return <></>

    const handleClaimVoucher = async (id_voucher) => {
        const id_customer = customer.id;
        const response = await claimVoucher(id_voucher, id_customer);
        if (response) fetchVouchers();
    }

    const handleCheckClaims = (customer_claims) => {
        if (!customer_claims) return false;
        
        const arrays = customer_claims.split(',');
        
        if (!arrays.includes(localStorage.getItem('cus_id'))) {
            return false;
        }

        return true;
    }

    return (
        <>
            <div className="wrap-dashboard" ref={sideBarRef}>

                <SideBarUser customer={customer} openSideBar={openSideBar} sideBarRef={sideBarRef} fetchData={fetchData}/>

                <div className="-dashboard-space" ref={sideBarRef}>
                    <div className="wrap-user-info">
                        <div className="-open-sidebar" onClick={handleOpenSideBar}>
                            <p><FontAwesomeIcon icon={faList} /> Menu</p>
                        </div>
                        <h2>
                            <FontAwesomeIcon icon={faTag} />
                            Voucher
                        </h2>

                        <div className="wrap-voucher">
                            <p>Danh sách voucher</p>
                            {vouchers?.map( p => (
                                <div className="voucher-item" key={p.id}>
                                    <img src="https://th.bing.com/th/id/OIP.P5_iNy_pJcbEZSEKRRW9PwHaFu?w=2000&h=1545&rs=1&pid=ImgDetMain" alt="" />
                                    <div className="voucher-info">
                                        <div>
                                            <p>Mã: {p.voucherCode}</p>
                                            <p>Giảm: {p.type_code === 'Giảm theo số tiền' ?
                                                        (p.discount_percentage.toLocaleString() + 'đ') : (p.discount_percentage + '%')}</p>
                                            <p>Còn lại: {p.quantity} vé</p>
                                            <p>Hết hạn: {new Date(p.end_date).toLocaleString()}</p>
                                        </div>
                                        {!handleCheckClaims(p.customer_claims) ?
                                            <button onClick={() => handleClaimVoucher(p.id)}>Nhận</button> :
                                            <button className="-claims">Đã nhận</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}