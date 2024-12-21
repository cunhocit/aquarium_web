/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getAllHisAPI } from '../../app/api/customersApi';
import { useOrderHistoryByEmail } from '../../hooks/useCustomer';

const ShowOrderHistory = ({email}) => {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);
  const {data, fetchData, isLoading} = useOrderHistoryByEmail(email);

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setHistory(data);
  }, [data]);

  if (isLoading) return <div>Đang tải...</div>

  const filteredData = history?.filter(
    (item) => item.product.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: <span style={{ fontSize: '0.9rem' }}> ID Đơn hàng </span>,
      selector: row => row.id,
      sortable: true
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Tên sản phẩm </span>,
      selector: row => row.product,
      sortable: true
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Số lượng </span>,
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Tổng giá trị </span>,
      selector: (row) =>  row.price,
      sortable: true,
      cell: row => <div>{new Intl.NumberFormat('vi-VN').format(row.price)}</div>
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Ngày mua </span>,
      selector: (row) => row.created_at,
      sortable: true,
      cell: (row) => new Date(row.created_at).toLocaleString(),
      sortField: 'created_at',
      id: 'created_at'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Trạng thái </span>,
      selector: row => row.status,
      sortable: true,
    }
  ];

  return (
    <>
      <div className="wrap-table-prod">
        <div >
          <div className='-header-table-order' style={{
            borderBottom: "1px solid gray",
            borderRadius: "5px 5px 0 0"
          }}>
            <div className='-header-left'>
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng"
                value={search}
                onChange={handleFilter}
                style={{
                  marginBottom: "0.5rem",
                  border: "none",
                  padding: '10px',
                  width: '300px',
                  background: 'rgb(255, 255, 255)',
                  outline: 'none',
                  borderRadius: '5px'
                }}
              />
            </div>
          </div>

          <div className="-table-prd">
            <DataTable
              columns={columns}
              data={filteredData}
              fixedHeader
              fixedHeaderScrollHeight="100%"
              responsive
              highlightOnHover
              striped
              pagination={false}
              className="small-font-table" 
              defaultSortFieldId="created_at"
              defaultSortAsc={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowOrderHistory;
