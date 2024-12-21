/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faAdd, faDollar, faRecycle, faSubtract, faTag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { useGetProductByListId } from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import { useCart } from "../../components/cart_contetn";
import { Payment_API } from "../../app/api/payment_api";

// localStorage.clear()

export const ListOrder = () => {
    const {data, fetchData, isLoading, customer, fetchData2, fetchData3, vouchers, fetchData4, transports} = useGetProductByListId();
    const [listProducts, setListProducts] = useState([]);
    const [cusVouchers, setCusVouchers] = useState(); // voucher code của customer
    const {cart, updateCart, deleteCart} = useCart();
    const [totalPrice, setTotalPrice] = useState();
    const [selectedProducts, setSelectedProducts] = useState([]);
    // const [voucherUse, setVoucherUse] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTransport, setSelectedTransport] = useState();
    const [selectPayMethod, setSelectPayMethod] = useState('Thanh toán khi nhận hàng');

    useEffect(() => {
        setListProducts(data);
        const vouchers_ = customer?.voucherCodes?.split(',');
        setCusVouchers(vouchers_?.filter(p => p != 'null'));
        const first_transport = transports?.[0];
        setSelectedTransport(first_transport);
    }, [data, customer, vouchers, transports]);

    useEffect(() => {
        let total = 0;
    
        selectedProducts?.forEach(product => {
            const discount = product?.discount_percentage
                ? (product.discount_percentage / 100) * product.price
                : 0;
            const priceAfterDiscount = product.price - discount;
            total += priceAfterDiscount * (product.quantity || 1);
        });

        if (selectedTransport?.price) {
            total += selectedTransport?.price;
        }
    
        setTotalPrice(total);
    }, [selectedProducts, selectedTransport]);

    useEffect(() => {

    }, [selectedTransport]);

    const handleQuantityChange = (id, quantity) => {
        const updatedProducts = listProducts.map(product => 
            product.id === id ? {...product, quantity: Math.max(1, quantity)} : product
        );
        setListProducts(updatedProducts);
    };

    // useEffect(() => {
    //     console.log(voucherUse);
    // }, [voucherUse])

    const handleUseVoucher = (e, product) => {
        if (!selectedProducts?.some(sp => sp.id === product.id)) {
            alert('Bạn chưa chọn sản phẩm!');
            return;
        }
    
        const selectedVoucher = e.target.value;
        const voucher = vouchers?.find(v => v.voucherCode === selectedVoucher);
    
        // Kiểm tra nếu voucher đã được sử dụng cho sản phẩm khác
        // const isVoucherUsedForOtherProduct = voucherUse.some(v => v.voucherCode === selectedVoucher && v.product !== product.id);
        
        // if (isVoucherUsedForOtherProduct) {
        //     alert('Voucher đã được sử dụng cho sản phẩm khác!');
        //     return;
        // }
    
        if (voucher) {
            // Cập nhật voucher sử dụng cho sản phẩm hiện tại
            // setVoucherUse(prev => [...prev, { product: product.id, voucherCode: selectedVoucher }]);
    
            listProducts?.map(p => {
                if (p.id === product.id) {
                    let newPrice = p?.price;
    
                    if (p?.discount_percentage) {
                        newPrice = p?.price * (1 - p.discount_percentage / 100);
                    }
    
                    if (voucher.type_code === 'Giảm theo số tiền') {
                        newPrice = Math.max(0, newPrice - voucher.discount_percentage); // Đảm bảo tổng tiền không âm
                    } else if (voucher.type_code === 'Giảm theo phần trăm') {
                        newPrice = newPrice * (1 - voucher.discount_percentage / 100);
                    }
    
                    setTotalPrice(newPrice);
                }
            });
        } else {
            // Reset tổng tiền nếu không chọn voucher
            let total = 0;
            selectedProducts?.forEach(product => {
                const discount = product?.discount_percentage
                    ? (product.discount_percentage / 100) * product.price
                    : 0;
                const priceAfterDiscount = product.price - discount;
                total += priceAfterDiscount * (product.quantity || 1);
            });
            total += selectedTransport?.price;
            setTotalPrice(total);
        }
    };

    if (isLoading) return <></>

    const handleDeleteProduct = (id) => {
        deleteCart(id);
        window.location.reload();
    }

    const handleChooseProduct = (product, isChecked) => {
        if (isChecked) {
            if (product?.quantity < 1 || !product?.quantity) {
                alert('Số lượng thấp nhất là 1')
                return;
            }
            setSelectedProducts(prev => [...prev, product]);
        } else {
            setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
        }
    }

    const handleSelectAll = (isChecked) => {
        setSelectAll(isChecked);
        if (isChecked) {
            setSelectedProducts(listProducts);
        } else {
            setSelectedProducts([]);
        }
    };

    const handlePayment = () => {
        if (selectedProducts?.length === 0) {
            alert('Chưa có sản phẩm nào được chọn!');
            return;
        }
        Payment_API(selectedProducts, selectedTransport?.transport, selectPayMethod, totalPrice
            // voucherUse,
        ).then(
            response => {
                if (response) {
                    selectedProducts?.map(p => {
                        deleteCart(p.id);
                    });
                    window.location.reload();
                }
            }
        );
    }

    return (
        <>
            <div className="warp-pay-list-order">
                <div className="-wrap-list-order-w">
                    <div className="-warp-list-order">
                        
                        {listProducts?.map((product, index) => (
                            <div className="-w-list-order-item" key={index}>
                                <div className="-w-list-order-item-img">
                                    <div className="-w-order-checked-img">
                                        <input type="checkbox" name="" id=""
                                            checked={selectedProducts.some((p) => p.id === product.id)}
                                            onClick={(e) => handleChooseProduct(product, e.target.checked)}
                                        />
                                        <img src={`http://localhost:8080/api/products/images/${product?.image}`} alt="" />
                                    </div>
                                    <div>
                                        <h4>{product?.name}</h4>
                                        <div>
                                            <p>
                                                <FontAwesomeIcon icon={faTag} />
                                                Danh mục: {product?.category}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faTag} />
                                                Giảm giá: {product?.discount_percentage ? (product?.discount_percentage + '%') : 'Không có'}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faTag} />
                                                Đơn giá: {product?.discount_percentage ? 
                                                (product?.price - product?.discount_percentage/100*product?.price).toLocaleString('vi-VN') : 
                                                product?.price.toLocaleString('vi-VN')} đ
                                            </p>
                                            {/* <label>
                                                <FontAwesomeIcon icon={faTag} />
                                                <select name="voucher" id="voucher" onChange={e => handleUseVoucher(e, product)}>
                                                    <option value="0">Mã giảm giá</option>
                                                    {cusVouchers?.map(p => (
                                                        <option key={p} value={p}>
                                                            {'-' + vouchers?.find(v => v.voucherCode === p)?.discount_percentage.toLocaleString() + 
                                                            (vouchers?.find(v => v.voucherCode === p)?.type_code === 'Giảm theo số tiền' ? 'đ' : '%')}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="-w-pay_header-item-2">
                                    <p className="-pay-header-item-2">
                                        <input type="number" min={1} placeholder="Số lượng"
                                            disabled={selectedProducts.some((p) => p.id === product.id)}
                                            value={product?.quantity}
                                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                                        />
                                    </p>
                                    <button onClick={() => handleDeleteProduct(product?.id)}>Xóa
                                        <FontAwesomeIcon icon={faRecycle} />
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                
                <div className="-wrap-pay-bottom">
                    <div className="-w-transport-bottom">
                        <label htmlFor="">Phương thức vận chuyển</label>
                        <select name="" id=""
                            value={setSelectedTransport?.transport}
                            onChange={e => {
                                const transport_find = transports?.find(p => p.transport === e.target.value);
                                setSelectedTransport(transport_find);
                            }}
                            disabled={selectAll}
                        >
                            {transports?.map( p => (
                                <option value={p?.transport} key={p?.id}>{p?.transport}</option>
                            ))
                            }
                        </select>
                        <p>{selectedTransport?.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                    <div className="-w-transport-bottom">
                        <label htmlFor="">Phương thức thanh toán</label>
                        <select name="" id=""
                            value={selectPayMethod}
                            onChange={e => setSelectPayMethod(e.target.value)}
                            disabled={selectAll}
                        >
                            <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                            <option value="Thanh toán bằng tài khoản">Thanh toán bằng tài khoản</option>
                        </select>
                    </div>
                </div>

                <div className="-wrap-pay-bottom">
                    <label htmlFor="" className="-pay-bottom-item">
                        <input type="checkbox"
                            value={selectAll}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                        Tất cả
                    </label>
                    <p>Sản phẩm ({selectedProducts?.length})</p>
                    <p className="-pay-bottom-item" >Tổng số tiền: {totalPrice.toLocaleString('vi-VN')}đ</p>
                    <div className="-pay-bottom-item">
                        <button onClick={handlePayment}>
                            Thanh toán
                            <FontAwesomeIcon icon={faDollar} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}