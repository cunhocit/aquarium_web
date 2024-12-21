/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { faBackwardStep, faGear, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetOrderById } from "../../hooks/useOrders";
import { Link } from "react-router-dom";
import { updateOrderAPI } from "../../app/api/ordersApi";
import { OrderValid } from "../../app/valid/ordersValid";

export default function OrderInfoLayout({id}) {
    const [isUnlockInput, setUnlockInput] = useState(false);
    const [products, setProducts] = useState(null);
    const [pay_methods, setPayMethods] = useState();
    const [status, setStatus] = useState();
    const [order, setOrder] = useState([]);
    const [image, setImage] = useState();
    const {data, loading, fetchData} = useGetOrderById(id);

    useEffect(() => {
        setOrder(data.order);
        setProducts(data.products);
        setPayMethods(data.pay_methods);
        setStatus(data.status);
    }, [data]);
    useEffect(() => {
        setImage(data.products?.find(p => p.name === order?.product)?.image);
    }, [products, order])

    if (loading) return <div>Đang tải...</div>
    
    const handleUnlockInput = () => {
        setUnlockInput(prev => !prev);
    }

    const handleUpdateOrder = async () => {
        if (OrderValid(order)){
            const data = {
                id: id,
                address: order.address,
                phone: order.phone,
                product: order.product,
                quantity: order.quantity,
                pay_method: order.pay_method,
                status: order.status
            }
            
            console.log("response: ");
    
            await updateOrderAPI(data).then(
                response => {if (response) fetchData()}
            ).catch((error) => {
                throw error;
            })
        }
    }

    return(
    <>
    <div className="wrap-add-prd" >
        <div className="wrap-lef-add-prd">
            <div className="wrap-header-command">
                <h3>Chi tiết đơn hàng</h3>
                <div className="gr-btn">
                    <div className="-left-back-prd-list" onClick={handleUnlockInput}>
                        <FontAwesomeIcon icon={faGear} />
                        Chỉnh sửa
                    </div>
                    <div className="-left-back-prd-list" >
                        <FontAwesomeIcon icon={faBackwardStep} />
                        <Link to={'/orders'}>Trở về</Link>    
                    </div>
                </div>
            </div>

            <div className="-add-prd-form" >
                <label className="value_box" htmlFor="">
                    <p>ID đơn hàng</p>
                    <input type="text" disabled
                        value={order.id}
                    />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Tên khách hàng</p>
                    <input type="text" disabled={true}
                        value={order.cus_name}
                        onChange={e => setOrder({...order, cus_name: e.target.value})}
                    />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Địa chỉ</p>
                    <input type="text" disabled={!isUnlockInput}
                        value={order.address}
                        onChange={e => setOrder({...order, address: e.target.value})}
                    />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Số điện thoại</p>
                    <input type="text" disabled={!isUnlockInput}
                        value={order.phone}
                        onChange={e => setOrder({...order, phone: e.target.value})}
                    />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Sản phẩm</p>
                    <select disabled={!isUnlockInput}
                        value={order.product}
                        onChange={e => setOrder({...order, product: e.target.value})}
                    >
                        {products.map(product => (
                            <option key={product.id} value={product.name}>{product.name}</option>
                        ))}
                    </select>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Số lượng</p>
                    <input type="text" disabled={!isUnlockInput}
                        value={order.quantity}
                        onChange={e => setOrder({...order, quantity: e.target.value})}
                    />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Số tiền</p>
                    <input type='text' min={0} disabled={true} 
                        value={order.price}
                        onChange={e => setOrder({...order, price: e.target.value})}
                    />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Ngày đặt hàng</p>
                    <input type="text" disabled={true}
                        value={new Date(order.created_at).toLocaleString()}
                    />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Phương thức vận chuyển</p>
                    <select name="" id=""  disabled={!isUnlockInput}
                        value={order.transport ? order.transport : 'Bình thường'}
                        onChange={e => setOrder({...order, transport: e.target.value})}
                    >
                        <option value="Bình thường">Bình thường</option>
                        <option value="Nhanh">Nhanh</option>
                        <option value="Siêu tốc">Siêu tốc</option>
                    </select>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Phương thức thanh toán</p>
                    <select name="" id=""  disabled={!isUnlockInput}
                        value={order.pay_method}
                        onChange={e => setOrder({...order, pay_method: e.target.value})}
                    >
                        {pay_methods.map(p => (
                            <option key={p.id} value={p.pay_method}>{p.pay_method}</option>
                        ))}
                    </select>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Trang thái</p>
                    <select name="" id=""  disabled={!isUnlockInput}
                        value={order.status}
                        onChange={e => setOrder({...order, status: e.target.value})}
                    >
                        {status.map(status => (
                            <option key={status.id} value={status.status}>{status.status}</option>
                        ))}
                    </select>
                </label>
            </div>

            {isUnlockInput && (
                <div className="-add-prd-btn" onClick={handleUpdateOrder}>Cập nhật</div>
            )}
        </div>
        
        <div className="wrap-right-add-prd">
            <h3>Hình ảnh sản phẩm</h3>
            <img src={`http://localhost:8080/api/products/images/${image}`} alt="" />
        </div>
    </div>
    </>
    )
}