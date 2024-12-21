/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { faBoxOpen, faCoins, faDollar, faGear, faHistory, faKey, faList, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useGetCustomerById } from "../../hooks/useCustomer"
import { useGetOrderById } from "../../hooks/useOrder"
import { SideBarUser } from "./sidebar_user"
import { DestroyOrderAPI } from "../../app/api/order_api"

export const Orders = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const sideBarRef = useRef(null);
    const {data, fetchData, isLoading} = useGetOrderById();
    const {data: customer, fetchData: fetchCustomer, isLoading: isLoadingCustomer} = useGetCustomerById();
    const [orderList, setOrderList] = useState();

    useEffect(() => {
        const sort_ = data?.order?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrderList(sort_);
        console.log('data_orders', data?.order);
        console.log('sort_', sort_);
        
    }, [data]);

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

    if (isLoading && isLoadingCustomer) return <></>

    const handleDestroyOrder = async (id) => {
        await DestroyOrderAPI(id);
        fetchData();
    }

    return (
        <>
            <div className="wrap-dashboard" ref={sideBarRef}>

                <SideBarUser openSideBar={openSideBar} sideBarRef={sideBarRef} customer={customer} />

                <div className="-dashboard-space" ref={sideBarRef}>
                    <div className="wrap-user-info">
                        <div className="-open-sidebar" onClick={handleOpenSideBar}>
                            <p><FontAwesomeIcon icon={faList} /> Menu</p>
                        </div>
                        <h2>
                            <FontAwesomeIcon icon={faBoxOpen} />
                            Đơn hàng
                        </h2>

                        <div className="wrap-user-order">
                            <div className="-user-order-list">

                                {orderList?.map((order, index) => (
                                    <div className="-user-order-item" key={index}>
                                        <img src={`http://localhost:8080/api/products/images/${
                                            data?.products?.find(p => p.name === order.product).image
                                        }`} alt="" />
                                        <div className="-order-item-info">
                                            <p>{order?.product}</p>
                                            <div className="-order-item-detail">
                                                <div>
                                                    <p>Danh mục: {order?.category}</p>
                                                    <p>Đơn giá: {data?.products?.find(p => p.name === order.product).price}</p>
                                                    <p>Số lượng: {order?.quantity}</p>
                                                    <p>Ngày đặt: {new Date(order?.created_at).toLocaleString()}</p>
                                                </div>

                                                <div>
                                                    Địa chỉ: {order?.address}
                                                    <p>Tình trạng: {order?.status}</p>
                                                </div>

                                                <div>
                                                    <p><span>Thành tiền: {order.price.toLocaleString('vi-VN')} đ</span></p>
                                                    {
                                                        (order?.status === 'Đã giao' || order?.status === 'Đã hủy' || order?.status === 'Đang chờ' || order?.status === 'Hoàn thành') 
                                                        ? <span style={{ color: 'green' }}>{order?.status}</span> 
                                                        : <button onClick={() => handleDestroyOrder(order?.id)}>Hủy đơn</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}