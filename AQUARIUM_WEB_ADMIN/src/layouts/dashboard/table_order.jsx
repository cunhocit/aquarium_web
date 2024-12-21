/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import DataTable from 'react-data-table-component';

// Các cột cho bảng
const columns = [
  {
    name: <span style={{ fontSize: '0.9rem', }}>Mã đơn</span>,
    selector: row => row.id,
    sortable: true,
    width: '100px'
  },
  {
    name: <span style={{ fontSize: '0.9rem' }}>Tên khách hàng</span>,
    selector: row => row.cus_name,
    sortable: true,
    width: '180px'
  },
  {
    name: <span style={{ fontSize: '0.9rem' }}>Tên sản phẩm</span>,
    selector: row => row.prd_name,
    sortable: true,
    width: '150px'
  },
  {
    name: <span style={{ fontSize: '0.9rem' }}>Giá</span>,
    selector: row => row.price,
    sortable: true,
    cell: row => new Intl.NumberFormat('vi-VN').format(row.price),
    width: '120px'
  },
  {
    name: <span style={{ fontSize: '0.9rem' }}>PT.Thanh toán</span>,
    selector: row => row.pay_method,
    sortable: true,
  },
  {
    name: <span style={{ fontSize: '0.9rem' }}>Thời gian đặt</span>,
    selector: row => row.created_at,
    sortable: true,
  },
  {
    name: <span style={{ fontSize: '0.9rem' }}>Tình trạng</span>,
    selector: row => row.status,
    sortable: true,
    width: '120px'
  },
];


const getData_table = (data) => {
  let dataReturn = [];

  const orders = data.orders;
  const customers = data.customers;
  const products = data.products;
  const pay_methods = data.payMethods;
  const order_status = data.orderStatus;

  orders.map(e => {
    if (e.status === "Đang chờ") {
      const customer_name = customers.find(c => c.name === e.cus_name)?.name;
      const product_name = products.find(p => p.name === e.product)?.name;
      const pay_method_string = pay_methods.find(p => p.pay_method === e.pay_method)?.pay_method;
      const order_status_string = order_status.find(o => o.status=== e.status)?.status;
      const order_date = (new Date(e.created_at)).toLocaleString();

      dataReturn.push({
        id: e.id,
        cus_name: customer_name,
        prd_name: product_name,
        price: e.price,
        pay_method: pay_method_string,
        created_at: order_date,
        status: order_status_string
      });
    }
  });

  return dataReturn;
}

export const TableOrders = ({data}) => {
  const [search, setSearch] = useState('');

  const dataTable = getData_table(data)
  
  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = dataTable.filter((item) =>
    item.cus_name?.toLowerCase().includes(search.toLowerCase()) ||
    item.prd_name?.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div className="wrap-top-user">
      <div className='-header-top-prd' style={{
          borderRadius: "5px 5px 0 0",
        }}>
        <h3>Đơn hàng đang xử lý</h3>

        <input
            type="text"
            placeholder="Tìm kiếm"
            value={search}
            onChange={handleFilter}
            style={{
                marginRight: '10px',
                padding: '10px', 
                width: '250px',
                border: "1px solid rgba(175, 175, 175, 0.5)",
                background: 'rgba(251, 251, 251, 0.971)',
                outline: 'none',
                borderRadius: "5px"
            }}
        />

      </div>

      {/* Bảng DataTable */}
      <div style={{
        maxHeight: '100%',
        overflowY: 'auto',
        border: "1px solid rgba(175, 175, 175, 0.5)",
        borderRadius: "5px"
      }}>
        <DataTable
          columns={columns}
          data={filteredData}
          fixedHeader
          fixedHeaderScrollHeight="320px"  
          responsive
          highlightOnHover
          striped
          pagination={false} 
          style={{cursor: 'pointer'}}
        />
      </div>
    </div>
  );
};

export default TableOrders;
