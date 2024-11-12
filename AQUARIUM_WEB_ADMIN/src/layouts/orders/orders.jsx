import ShowOrders from "./show_orders";

export default function Orders () {
    return (
    <>
        <div className="wrap-orders">
            <h2 className="products-title">Đơn hàng</h2>

            <ShowOrders/>
        </div>
    </>
    )
}