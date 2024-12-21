/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { faAdd, faTags } from "@fortawesome/free-solid-svg-icons"
import { faSubtract } from "@fortawesome/free-solid-svg-icons/faSubtract";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useCart } from "../../components/cart_contetn";
import { useNavigate } from "react-router-dom";

export const ProducInfo = ({product, data2}) => {
    const [quantity, setQty] = useState(1);
    const {cart, updateCart} = useCart();
    const navigate = useNavigate();

    const upQty = () => setQty(quantity + 1);
    const lowQty = () => {
        if (quantity > 1) {
            setQty(quantity - 1);
        }
    }

    const handleLinkToPaymentPage = (id) => {
        const arr = JSON.parse(localStorage.getItem('shopping_cart')) || [];
        console.log(id);
        console.log(arr?.includes(id));
        if (!arr?.includes(id)) {
            alert('Sản phẩm chưa có trong giỏ hàng!');
            return;
        }
        navigate(`/payment`);
    }

    return (
        <>
            <div className="wrap-product-info">
                <img src={`http://localhost:8080/api/products/images/${product?.image ? product?.image : 'image.png'}`} alt="" />

                <div className="-detal-info">
                    <h4>Chi tiết sản phẩm</h4>
                    <p className="-name">[{product?.name}]</p>
                    <div className="-detail-post">
                        <p>{product?.turn_order} lượt mua</p> | <p>{data2?.comments?.length} đánh giá</p>
                    </div>

                    <div className="-detail-text">
                        <h4>Mô tả sản phẩm:</h4>
                        <p dangerouslySetInnerHTML={{ __html: product?.description }}/>
                    </div>

                    <div className="-detail-sale-code">
                        <FontAwesomeIcon icon={faTags} />
                        <p>Giảm giá: {product?.discount_percentage ? (product?.discount_percentage + '%') : 'Không có'}</p>
                    </div>
                    
                    <div className="-detail-quantity">
                        <p>Số lượng: </p>
                        <div>
                            <p><FontAwesomeIcon icon={faAdd} onClick={upQty} /></p>
                            <p>{quantity}</p>
                            <p><FontAwesomeIcon icon={faSubtract} onClick={lowQty}/></p>
                        </div>
                    </div>

                    <div className="-detail-price">
                        {product?.discount_percentage ? <h2><s>{product?.price.toLocaleString('vi-VN')} đ</s></h2> : ''}
                        <div>Giá: {
                            product?.discount_percentage ?
                            (product?.price - (product?.price * product?.discount_percentage / 100)).toLocaleString('vi-VN')
                            :
                            product?.price.toLocaleString('vi-VN')    
                        }đ</div>
                    </div>

                    <div className="-detail-controll">
                        <button onClick={() => updateCart(product?.id)}>+ Giỏ hàng</button>
                        <button onClick={() => handleLinkToPaymentPage(product?.id)}>Mua ngay</button>
                    </div>
                </div>
            </div>
        </>
    )
}