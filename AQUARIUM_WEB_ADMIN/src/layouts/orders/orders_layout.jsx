/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowOrders from "./show_orders";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useGetOrder } from "../../hooks/useOrders";


export default function OrdersLayout () {
    const {data, loading} = useGetOrder();

    if (loading) return <div>Đang tải...</div>
    
    return (
    <>
        <div className="wrap-orders">
            <div className="title_box">
                <FontAwesomeIcon icon={faShoppingCart} />
                <h2 className="products-title">Đơn hàng</h2>
            </div>

            <ShowOrders data={data} />
        </div>
    </>
    )
}