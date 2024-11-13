import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowOrders from "./show_orders";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function Orders () {
    return (
    <>
        <div className="wrap-orders">
            <div className="title_box">
                <FontAwesomeIcon icon={faShoppingCart} />
                <h2 className="products-title">Đơn hàng</h2>
            </div>

            <ShowOrders/>
        </div>
    </>
    )
}