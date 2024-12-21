/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faArrowLeft, faArrowRight, faCartShopping, faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShowProductList = ({data}) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    useEffect(() => {
        const sort_data = data?.products?.sort((a, b) => {
            const dateA = new Date(a.updated_at).getTime();
            const dateB = new Date(b.updated_at).getTime();
            return dateB - dateA;
        });
        setProducts(sort_data);
    }, [data]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 767) {
                setItemsPerPage(16);
            } else {
                setItemsPerPage(15);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const linkToProductDetails = (id) => {
        if (!localStorage.getItem('jwt_token_customer')) {
            alert('Vui lòng đăng nhập để xem chi tiết sản phẩm');
            return;
        }
        navigate(`/product/${id}`);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentProducts = products.slice(startIndex, endIndex);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    
    const getDayExpriedSale = (date) => {
        const today = new Date().getTime();
        const end_date = new Date(date).getTime();
        const diffTime = end_date - today;
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return days;
    }

    return (
        <>
            <section className="wrap-show-product-list">
                <div className="title-show-product">
                    <p>Gợi ý mới nhất</p>
                    <hr />
                </div>

                <div className="util-wrap-list-product">
                    <div className="wrap-list-product">
                        {currentProducts?.map((product, index) => (
                            <div className="-w-list-product-item" key={index} onClick={(e) => linkToProductDetails(product.id)}>
                                <div className="box-product">
                                    <img className="img-product" src={`http://localhost:8080/api/products/images/${product?.image ? product?.image : 'image.png'}`} />
                                    <div className="info-product">
                                        <p className="name-product">{product?.name}</p>
                                        {product?.discount_percentage && (
                                            <div className="down-price-product">
                                                <FontAwesomeIcon icon={faTags} />
                                                <p>-{product?.discount_percentage} %</p>
                                                <p><s>{product?.price.toLocaleString('vi-VN')}<u>đ</u></s></p>
                                            </div>
                                        )}
                                        <div className="price-product">
                                            <p>{(product?.discount_percentage ? 
                                                (product?.price*(1 - product?.discount_percentage/100)) : 
                                                product?.price).toLocaleString('vi-VN')}
                                                <u>đ</u>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="-add-cart-shop">
                                        <FontAwesomeIcon icon={faCartShopping}/>
                                    </div>
                                    {product?.discount_percentage && (
                                        <div className="-add-flash-sale">
                                            Còn {getDayExpriedSale(product?.end_date)} ngày
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="-controller-btn">
                    <div onClick={() => handlePrevPage()}><FontAwesomeIcon icon={faArrowLeft} /></div>
                    <div >{currentPage}/{totalPages}</div>
                    <div onClick={() => handleNextPage()}><FontAwesomeIcon icon={faArrowRight} /></div>
                </div>
            </section>
        </>
    )
}