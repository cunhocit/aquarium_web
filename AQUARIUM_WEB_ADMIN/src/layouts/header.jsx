/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAdminAPI } from '../app/api/adminApi';
import { useGetHeader } from '../hooks/useAdmin';
import { Link } from 'react-router-dom';

// localStorage.clear();

export default function Header({handleOpenSB}) {
    const [admin, setAdmin] = useState();
    const [products, setProducts] = useState();
    const [customers, setCustomers] = useState();
    const {data, fetchData, isLoading} = useGetHeader();
    const [search, setSearch] = useState('');

    useEffect(() => {
        setAdmin(data?.admin);
        setProducts(data?.products);
        setCustomers(data?.customers);
    }, [data])

    if (isLoading) return <div>Đang tải...</div>   
    
    const filterData1 = products?.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
    )

    const filterData2 = customers?.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
    )
    
    return (
        <>
            <div className="wrap-header">   

                <div className="wrap-search-bar">
                    <div className='showSidebar' onClick={handleOpenSB} >
                        <FontAwesomeIcon icon={faBars} size='xl'/>
                    </div>
                    <div className="search-bar">
                        <input  type="text"
                                placeholder='Tìm kiếm'
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <div className='-result-search' style={{display: search === '' ? 'none' : 'flex'}}>
                        {filterData1?.map(p => (
                            <div key={p.id}><Link to={`/product_info/${p.id}`}>{p.name}</Link></div>
                        ))}
                        {filterData2?.map(p => (
                            <div key={p.id}><Link to={`/customer_info/${p.id}`}>{p.name}</Link></div>
                        ))}
                    </div>
                </div>

                <div className='wrap-action-header'>
                    <div>
                        <p>{admin?.name}</p>
                    </div>

                    <div className='admin-avatar'>
                        <img src={`http://localhost:8080/api/admins/images/${admin?.image ? admin?.image : 'image.png'}`} alt="" />
                    </div>
                </div>

            </div>
        </>
    )
}