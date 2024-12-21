/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { faCartShopping, faClose, faFilter, faTags, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { optionAddressProvin } from "../../components/select"

import Select from 'react-select';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchResult = ({openFilter, handleOpenFilter, products, categories, 
    unfilteredData, dataResults, setDataResults}) => {

    const filterRef = useRef(null);
    const navigate = useNavigate();
    const [selectedCat, setSelectedCat] = useState([]);
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');
    
    const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            handleOpenFilter(); 
        }
    };

    useEffect(() => {
        if (openFilter) {
            document.addEventListener("mousedown", handleClickOutside);
        }else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openFilter]);

    useEffect(() => {
        console.log('cat: ', selectedCat);
    }, [selectedCat]);

    const linkToProductDetails = (id) => {
        if (!localStorage.getItem('jwt_token_customer')) {
            alert('Vui lòng đăng nhập để xem chi tiết sản phẩm');
            return;
        }
        navigate(`/product/${id}`);
    }
    
    const getDayExpriedSale = (date) => {
        const today = new Date().getTime();
        const end_date = new Date(date).getTime();
        const diffTime = end_date - today;
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return days;
    }

    const handleChooseCat = (cat) => {
        if (!selectedCat?.some(c => c.id === cat.id)) {
            setSelectedCat([...selectedCat, cat]);
        }else {
            setSelectedCat(prev => {
                const newList = prev.filter(c => c.id != cat.id)
                return newList;
            });
        }
    }

    const handleFilterAccept = () => {
        let filteredData = [...unfilteredData];

        // Lọc theo danh mục (selectedCat)
        if (selectedCat.length > 0) {
            filteredData = filteredData.filter((product) => 
                selectedCat.some((cat) => cat.category === product.category)
            );
        }

        // Lọc theo khoảng giá
        if (startPrice) {
            filteredData = filteredData.filter((product) => 
                (product?.discount_percentage ? product?.price * (1 - product?.discount_percentage/100) : 
                product?.price) >= parseFloat(startPrice));
        }
        if (endPrice) {
            filteredData = filteredData.filter((product) => 
                (product?.discount_percentage ? product?.price * (1 - product?.discount_percentage/100) : 
                product?.price) <= parseFloat(endPrice));
        }
        setDataResults(filteredData);
    }

    const handleDelteCondition = () => {
        setDataResults(unfilteredData);
        setSelectedCat([]);
        setEndPrice('');
        setStartPrice('');
    }
 
    return (
        <>
            <section className="wrap-show-product">

                <div className="-show-product-container">

                    <div className={`wrap-filter-box ${openFilter ? 'open' : ''}`} ref={filterRef}>
                        <div className="box-fillter-component">
                            <div>
                                <FontAwesomeIcon icon={faFilter} />
                                <h4>Bộ lọc</h4>
                            </div>
                            <FontAwesomeIcon icon={faClose} style={{display: openFilter ? 'flex' : 'none'}}  onClick={handleOpenFilter}/>
                        </div>

                        <hr />

                        <div className="box-filter-categoires">
                            <p>Danh mục</p>
                            <div>
                                {categories?.map((cat) => (
                                    <label key={cat.id}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCat.some((c) => c.id === cat.id)}
                                            onChange={() => handleChooseCat(cat)}
                                        />
                                        {cat.category}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <hr />

                        <div className="box-filter-price">
                            <p>Khoảng giá</p>
                            <div className="price-about-box">
                                <input type="text" name="" id="" placeholder="Từ 0đ"
                                    value={startPrice}
                                    onChange={e => setStartPrice(e.target.value)}
                                />
                                <p>đến</p>
                                <input type="text" name="" id="" placeholder="đến Xđ"
                                    value={endPrice}
                                    onChange={e => setEndPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <hr />

                        <button onClick={handleFilterAccept}>Áp dụng</button>

                        <button onClick={handleDelteCondition}>Xóa tất cả</button>

                    </div>

                    <div className="wrap-list-product-p">
                        <div className="wrap-list-product">
                            {products?.map(p => (
                                <div className="-w-list-product-item" key={p.id} onClick={(e) => linkToProductDetails(p.id)}>
                                    <div className="box-product">
                                        <img className="img-product" src={`http://localhost:8080/api/products/images/${p?.image ? p?.image : 'image.png'}`} alt="" />
                                        <div className="info-product">
                                            <p className="name-product">{p?.name}</p>
                                            {p?.discount_percentage && (
                                                <div className="down-price-product">
                                                    <FontAwesomeIcon icon={faTags} />
                                                    <p>-{p?.discount_percentage}%</p>
                                                    <p><s>{p?.price}<u>đ</u></s></p>
                                                </div>)
                                            }
                                            <div className="price-product">
                                                <p>{(p?.discount_percentage ? 
                                                    p?.price*(1 - p?.discount_percentage/100) : p?.price).toLocaleString('vi-VN')}
                                                <u>đ</u>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="-add-cart-shop">
                                            <FontAwesomeIcon icon={faCartShopping}/>
                                        </div>
                                        {p?.discount_percentage && (
                                            <div className="-add-flash-sale">
                                                Còn {getDayExpriedSale(p?.end_date)} ngày
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <div className="explore-btn"><p>Xem thêm</p></div> */}

                    </div>

                </div>

            </section>
        </>
    )
}