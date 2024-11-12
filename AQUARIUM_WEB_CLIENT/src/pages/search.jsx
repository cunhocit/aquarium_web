import { Helmet, HelmetProvider } from "react-helmet-async";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { faMagnifyingGlass, faChevronRight, faChevronLeft, faTags,faFilter } from '@fortawesome/free-solid-svg-icons';

import NavigationBar from "../components/navigation";
import Footer from "../components/footer";
import LoginForm from "../components/login_form";
import RegisterForm from "../components/register_form";

import { useOpenForm } from "../hooks/navigation_hook";
import { optionPrice, optionAddressProvin } from "../components/select";

export default function Search(){

    const { isOpenLoginForm, isOpenRegisterForm,
        handleOpenLoginForm, handleOpenRegisterForm } = useOpenForm();

    return(
        <HelmetProvider>
            <div className="wrap-search-page">
                <Helmet>
                    <title>Tìm kiếm sản phẩm</title>
                </Helmet>

                {/* LOGIN FORM */}
                <LoginForm isOpen={isOpenLoginForm} handleOpenForm={handleOpenLoginForm} handleOpenRigister={handleOpenRegisterForm} />

                {/* REGISTER FORM */}
                <RegisterForm isOpen={isOpenRegisterForm} handleOpenForm={handleOpenRegisterForm} handleLoginForm={handleOpenLoginForm} />

                {/*  */}
                <section className="wrap-header-search-product">
                    {/* NAVIGATION BAR */}
                    <NavigationBar handleOpenForm={handleOpenLoginForm}/>

                    <div className="insert_navigation"></div>

                    <div className="header-search-bar">
                        <p>Tìm kiếm</p>
                        <input type="text" placeholder="Tìm kiếm sản phẩm"/>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    
                    <div className="title-search-for-word">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <p>Tìm kiếm cho từ khóa:</p>
                    </div>

                    <div className="wrap-search-for-option">
                        <div className="wrap-option-left-search-for-option">
                            <p>Sắp xếp theo</p>

                            <div className="option-search-box"><p>Mới nhất</p></div>

                            <div className="option-search-box"><p>Bán chạy</p></div>

                            <Select
                                options={optionPrice()}
                                placeholder='Giá'
                                isClearable
                            />
                        </div>

                        <div className="wrap-option-right-search-for-option">
                            <p className="pageCount">1/9</p>
                            <div className="prevPage"><FontAwesomeIcon icon={faChevronLeft} /></div>
                            <div className="nextPage"><FontAwesomeIcon icon={faChevronRight} /></div>
                        </div>
                    </div>
                </section>

                {/* SHOW PRODUCT LIST */}
                <section className="wrap-show-product">

                    {/* FILTER BOX */}
                    <div className="wrap-filter-box">
                        <div className="box-fillter-component">
                            <FontAwesomeIcon icon={faFilter} />
                            <h3>Bộ lọc tìm kiếm</h3>
                        </div>

                        <hr />

                        <div>
                            <Select
                                options={optionAddressProvin()}
                                isClearable
                                placeholder='Nơi bán'
                            />
                        </div>

                        <div className="box-fillter-component">
                            <div className="wrap-price-about-box">
                                <p>Khoảng giá</p>
                                <div className="price-about-box">
                                    <input type="text" name="" id="" />
                                    <p>đến</p>
                                    <input type="text" name="" id="" />
                                </div>
                            </div>
                        </div>




                    </div>

                    {/* LPRODUCT LIST */}
                    <div className="wrap-list-product-p">

                        <div className="wrap-list-product">
                            
                            <div className="wrap-info-product">
                                <div className="box-product">
                                    <img className="img-product" src="/src/assets/img/slide_image/image2.png" alt="" />
                                    <div className="info-product">
                                        <p className="name-product">Combo cá beta</p>
                                        <div className="down-price-product">
                                            <FontAwesomeIcon icon={faTags} />
                                            <p>-20%</p>
                                            <p><s>150.000<u>đ</u></s></p>
                                        </div>
                                        <div className="price-product">
                                            <p>99.000<u>đ</u></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="explore-btn"><p>Xem thêm</p></div>

                    </div>

                </section>

                <section>
                    <Footer/>
                </section>

            </div>
        </HelmetProvider>
    )
}