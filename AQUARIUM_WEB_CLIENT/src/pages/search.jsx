/* eslint-disable no-unused-vars */
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronRight, faChevronLeft, faTags,faFilter, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import NavigationBar from "../components/navigation";
import Footer from "../components/footer";
import { SearchHeader } from "../layouts/search/search_header";
import { SearchResult } from "../layouts/search/search_result";
import { ShopingCart } from "../components/shopping_cart";
import { useEffect, useState } from "react";
import { ShoppingCartFinal } from "../components/shopping_cart_final";
import { CartProvider } from "../components/cart_contetn";
import { useParams } from "react-router-dom";
import { useGetProducts } from "../hooks/useProduct";

export default function Search(){
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(prev => !prev);
    const {search_name} = useParams();
    const {data, fetchData, isLoading} = useGetProducts();
    const [dataResults, setDataResults] = useState();
    const [unfilteredData, setUnfilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const datafilter = data?.products?.filter(item => 
            item.name.toLowerCase().includes(search_name.toLowerCase())
        );
        setDataResults(datafilter);
        setUnfilteredData(datafilter);
        setSearch('');
    }, [data, search_name]);

    if (isLoading) return <></>
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentProducts = dataResults?.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data?.products?.length / itemsPerPage);

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

    const handleFilterData = (key) => {
        console.log("[  Key: ", key, "  ]");

        let filteredData = [...unfilteredData]; // Lọc từ dữ liệu gốc

        switch (key) {
            case 'new':
                filteredData = filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setDataResults(filteredData);
                break;
            case 'top-sale':
                filteredData = filteredData.sort((a, b) => b.turn_order - a.turn_order);
                setDataResults(filteredData);
                break;
            case 'asc-price':
                filteredData = filteredData.sort((a, b) => a.price - b.price);
                setDataResults(filteredData);
                break;
            case 'desc-price':
                filteredData = filteredData.sort((a, b) => b.price - a.price);
                setDataResults(filteredData);
                break;
            case 'sale':
                filteredData = filteredData.filter(p => p.discount_percentage != null);
                setDataResults(filteredData);
                break;
            case 'not-sale':
                filteredData = filteredData.filter(p => p.discount_percentage == null);
                setDataResults(filteredData);
                break;
            case 'all-price':
                setDataResults(unfilteredData); // Trả lại dữ liệu ban đầu
                break;
            default:
                filteredData = unfilteredData?.filter(item =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                );
                setDataResults(filteredData);
        }
    };

    return(
        <HelmetProvider>

            <Helmet> <title>Tìm kiếm sản phẩm</title> </Helmet>

            <div className="wrap-search-page">

                <section className="-wrap-navigation">
                    <NavigationBar/>
                </section>

                <CartProvider>

                    <ShoppingCartFinal/>
                    
                    <SearchHeader 
                        handleOpenFilter={handleOpenFilter} 
                        search={search}
                        setSearch={setSearch}
                        handlePrevPage={handlePrevPage}
                        currentPage={currentPage}
                        handleNextPage={handleNextPage}
                        totalPages={totalPages}
                        handleFilterData={handleFilterData}
                        data={data?.products}
                    /> 

                    <SearchResult 
                        openFilter={openFilter} 
                        handleOpenFilter={handleOpenFilter}
                        products={currentProducts}
                        categories={data?.categories}
                        unfilteredData={unfilteredData}
                        dataResults={dataResults}
                        setDataResults={setDataResults}
                    />

                </CartProvider>

                <Footer/>

            </div>

        </HelmetProvider>
    )
}