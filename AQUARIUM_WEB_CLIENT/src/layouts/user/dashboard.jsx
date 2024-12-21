/* eslint-disable no-unused-vars */
import { faBoxOpen, faCoins, faDollar, faGear, faHistory, faKey, faList, faSignOut, faSquareCaretUp, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useGetCustomerById } from "../../hooks/useCustomer"
import { SideBarUser } from "./sidebar_user"
import { updateCustomer } from "../../app/api/customer_api"

export const Dashboard = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const sideBarRef = useRef(null);
    const [customer, setCustomer] = useState();
    const [customer2, setCustomer2] = useState();
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
        setCustomer2(data)
    }, [data]);

    if (isLoading) return <></>

    const handleUpadte = async () => {
        await updateCustomer(customer);
        window.location.reload();
    }

    return (
        <>
            <div className="wrap-dashboard" ref={sideBarRef}>

                <SideBarUser customer={customer2} openSideBar={openSideBar} sideBarRef={sideBarRef} fetchData={fetchData} />

                <div className="-dashboard-space" ref={sideBarRef}>
                    <div className="wrap-user-info" >
                        <div className="-open-sidebar" onClick={handleOpenSideBar}>
                            <p><FontAwesomeIcon icon={faList} /> Menu</p>
                        </div>
                        <h2>
                            <FontAwesomeIcon icon={faGear} />
                            Quản lý hồ sơ cá nhân
                        </h2>

                        <div className="-box-user-info">
                            <label htmlFor="">Họ và tên
                                <input type="text" name="" id="" 
                                    value={customer?.name}
                                    onChange={e => setCustomer({...customer, name: e.target.value})}
                                />
                            </label>
                            <label htmlFor="">Email
                                <input type="email" name="" id="" 
                                    value={customer?.email}
                                    onChange={e => setCustomer({...customer, email: e.target.value})}
                                    disabled
                                />
                            </label>
                            <label htmlFor="">Số điện thoại
                                <input type="phone" name="" id="" 
                                    value={customer?.phone}
                                    onChange={e => setCustomer({...customer, phone: e.target.value})}
                                />
                            </label>
                            <label htmlFor="">Ngày sinh
                                <input type="date" name="" id="" 
                                    value={customer?.birth_date}
                                    onChange={e => setCustomer({...customer, birth_date: e.target.value})}
                                />
                            </label>
                            <label htmlFor="">Giới tính
                                <select name="" id=""
                                    value={customer?.gender || 'Khác'}
                                    onChange={e => setCustomer({...customer, gender: e.target.value})}
                                >
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </label>
                            <label htmlFor="">Địa chỉ
                                <input type="text" name="" id="" 
                                    value={customer?.address}
                                    onChange={e => setCustomer({...customer, address: e.target.value})}
                                />
                            </label>

                            <button onClick={handleUpadte}>Cập nhật</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}