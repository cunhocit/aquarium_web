/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { faChevronLeft, faChevronRight, faLeaf, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Select from 'react-select';
import { optionPrice, optionSale } from "../../components/select";
import { Link, useNavigate } from "react-router-dom";

export const SearchHeader = ({handleOpenFilter, search, 
    setSearch, handlePrevPage, handleNextPage, totalPages, currentPage, handleFilterData, data}) => {

    const navigate = useNavigate();

    const handleSearchEnter = (e) => {
        if (e.key === 'Enter' && search != '') {
            if (!localStorage.getItem('jwt_token_customer')) {
                alert('Vui lòng đăng đăng nhập để tìm kiếm');
                return;
            }
            navigate(`/search/${search}`);
        }
    };

    const dataFilter = data?.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <section className="wrap-header-search-product">
                <div className="header-search-bar">
                    <FontAwesomeIcon icon={faLeaf} className="-svg-i"/>
                    <div>
                        <p>Tìm kiếm</p>
                        <input type="text" placeholder="Tìm kiếm sản phẩm"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={handleSearchEnter}
                        />
                        <FontAwesomeIcon className="-svg-glass" icon={faMagnifyingGlass} />
                    </div>
                    <FontAwesomeIcon icon={faLeaf} className="-svg-i"/>
                    <div className="-w-result" style={{display: search != '' ? 'flex' : 'none'}}>
                        {dataFilter?.map(p => (
                            <div key={p.id}><Link to={`/product/${p.id}`}>{p.name}</Link></div>
                        ))}
                    </div>
                </div>
                
                <div className="title-search-for-word">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <p>Tìm kiếm cho từ khóa: {search}</p>
                </div>

                <div className="wrap-search-for-option">
                    <p>Sắp xếp theo</p>

                    <div className="option-search-box" onClick={() => handleFilterData('new')}><p>Mới nhất</p></div>

                    <div className="option-search-box" onClick={() => handleFilterData('top-sale')}><p>Bán chạy</p></div>

                    <Select
                        className="select-price"
                        options={optionPrice()}
                        placeholder='Giá'
                        isClearable
                        onChange={e => handleFilterData(e?.value)}
                    />

                    <Select
                        className="select-price"
                        options={optionSale()}
                        placeholder='Khuyến mãi'
                        isClearable
                        onChange={e => handleFilterData(e?.value)}
                    />

                    <div className="-open-filter-btn" onClick={handleOpenFilter}>Bộ lọc</div>

                    <div className="wrap-option-right-search-for-option">
                        <p className="pageCount">{currentPage}/{totalPages}</p>
                        <div className="prevPage" onClick={handlePrevPage}><FontAwesomeIcon icon={faChevronLeft} /></div>
                        <div className="nextPage" onClick={handleNextPage}><FontAwesomeIcon icon={faChevronRight} /></div>
                    </div>
                </div>
            </section>
        </>
    )
}