/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const ShowOrders = ({data}) => {
  const [search, setSearch] = useState('');

  const dataOrders = [];

  const orders = data.orders;

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  orders.map(e => {
    dataOrders.push({
      orderId: e.id,
      email: e.email,
      customerName: e.cus_name,
      product: e.product,
      quantity: e.quantity,
      price:  new Intl.NumberFormat('vi-VN').format(e.price),
      orderDate: (new Date(e.created_at)).toLocaleString(),
      status: e.status,
      view: '[Xem chi tiết]',
    });
  });

  const columns = [
    {
      name: <span style={{ fontSize: '0.9rem' }}> ID </span>,
      selector: row => row.orderId,
      sortable: true,
      width: '90px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Email </span>,
      selector: row => row.email,
      sortable: true,
      width: '230px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Tên khách hàng </span>,
      selector: row => row.customerName,
      sortable: true,
      width: '150px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Sản phẩm </span>,
      selector: row => row.product,
      sortable: true,
      width: '150px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Số lượng </span>,
      selector: row => row.quantity,
      sortable: true,
      width: '110px',
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Tổng tiền </span>,
      selector: row => row.price,
      sortable: true,
      width: '140px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Ngày đặt hàng </span>,
      selector: row => row.orderDate,
      sortable: true,
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Trạng thái </span>,
      selector: row => row.status,
      sortable: true,
      width: '150px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}>Hành động</span>,
      selector: row => row.view,
      sortable: true,
      width: '130px',
      cell: (row) => (
          <Link to={`/orders_info/${row.orderId}`}>
            <div style={{cursor: 'pointer', color: 'black'}}> {row.view} </div>
          </Link>
      )
    }
  ];

  const filteredData = dataOrders.filter(item =>
    (item.customerName && item.customerName.toLowerCase().includes(search.toLowerCase())) ||
    (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
    (item.product && item.product.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <div className="wrap-table-prod">
        <div >
          <div className='-header-table-prd' style={{ borderRadius: "5px 5px 0 0" }}>
            <div className='-header-lef'>
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng"
                value={search}
                onChange={handleFilter}
                style={{
                  marginRight: '10px',
                  padding: '10px',
                  width: '300px',
                  border: '1px solid #38383849',
                  background: 'rgb(255, 255, 255)',
                  outline: 'none',
                  borderRadius: '5px'
                }}
              />
            </div>
          </div>

          <div className='-table-prd'>
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowOrders;
