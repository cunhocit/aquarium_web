/* eslint-disable react/prop-types */
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import OrderInfo from './order_info';

const ShowOrders = () => {
  const [search, setSearch] = useState('');

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  const [isShowInfo, setShowInfo] = useState(false);
  const handleInfoPrd = () => {
    setShowInfo(prev => !prev);
  }

  // Dữ liệu mẫu cho đơn hàng
  const data = [
    {
        orderId: 'ORD001',
        customerName: 'Nguyễn Văn A',
        product: 'Cà phê Arabica',
        quantity: 2,
        price: '500,000 VND',
        orderDate: '2024-11-10',
        paymentMethod: 'Thẻ tín dụng',
        status: 'Đã giao hàng',
        view: <div style={{color: 'black', cursor: 'pointer'}} onClick={() => handleInfoPrd()} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD002',
        customerName: 'Trần Thị B',
        product: 'Cà phê Robusta',
        quantity: 1,
        price: '250,000 VND',
        orderDate: '2024-11-11',
        paymentMethod: 'COD',
        status: 'Đang vận chuyển',
        view: <div style={{color: 'black', cursor: 'pointer'}} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD003',
        customerName: 'Lê Văn C',
        product: 'Cà phê Espresso',
        quantity: 3,
        price: '750,000 VND',
        orderDate: '2024-11-09',
        paymentMethod: 'PayPal',
        status: 'Đã hủy',
        view: <div style={{color: 'black'}} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD004',
        customerName: 'Phạm Thị D',
        product: 'Cà phê Cappuccino',
        quantity: 2,
        price: '600,000 VND',
        orderDate: '2024-11-08',
        paymentMethod: 'Thẻ tín dụng',
        status: 'Đang xử lý',
        view: <div style={{color: 'black'}} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD005',
        customerName: 'Võ Văn E',
        product: 'Cà phê Latte',
        quantity: 1,
        price: '350,000 VND',
        orderDate: '2024-11-07',
        paymentMethod: 'Chuyển khoản',
        status: 'Đã giao hàng',
        view: <div style={{color: 'black'}} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD006',
        customerName: 'Đỗ Thị F',
        product: 'Cà phê Mocha',
        quantity: 4,
        price: '1,200,000 VND',
        orderDate: '2024-11-06',
        paymentMethod: 'COD',
        status: 'Đang vận chuyển',
        view: <div style={{color: 'black'}} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD007',
        customerName: 'Nguyễn Văn G',
        product: 'Cà phê Cold Brew',
        quantity: 2,
        price: '400,000 VND',
        orderDate: '2024-11-05',
        paymentMethod: 'PayPal',
        status: 'Đã giao hàng',
        view: <div style={{color: 'black'}} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD008',
        customerName: 'Lý Thị H',
        product: 'Cà phê Macchiato',
        quantity: 3,
        price: '900,000 VND',
        orderDate: '2024-11-04',
        paymentMethod: 'Thẻ tín dụng',
        status: 'Đang xử lý',
        view: <div style={{color: 'black'}} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD009',
        customerName: 'Phan Văn I',
        product: 'Cà phê Affogato',
        quantity: 1,
        price: '450,000 VND',
        orderDate: '2024-11-03',
        paymentMethod: 'Chuyển khoản',
        status: 'Đã hủy',
        view: <div style={{color: 'black'}} >[Xem chi tiết]</div>
      },
      {
        orderId: 'ORD010',
        customerName: 'Ngô Thị J',
        product: 'Cà phê đen đá',
        quantity: 5,
        price: '1,250,000 VND',
        orderDate: '2024-11-02',
        paymentMethod: 'COD',
        status: 'Đang vận chuyển',
        view: <div style={{color: 'black'}} >[Xem chi tiết]</div>
      }
  ];
  

  // Lọc dữ liệu đơn hàng theo tên khách hàng
  const filteredData = data.filter(item =>
    item.customerName.toLowerCase().includes(search.toLowerCase())
  );

  // Cấu hình các cột của bảng
  const columns = [
    {
      name: <span style={{ fontSize: '0.9rem' }}> ID </span>,
      selector: row => row.orderId,
      sortable: true,
      width: '90px'
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
      name: <span style={{ fontSize: '0.9rem' }}> Giá trị </span>,
      selector: row => row.price,
      sortable: true,
      width: '140px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Ngày đặt hàng </span>,
      selector: row => row.orderDate,
      sortable: true,
      width: '140px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> P.T Thanh Toán </span>,
      selector: row => row.paymentMethod,
      sortable: true,
      width: '120px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Trạng thái </span>,
      selector: row => row.status,
      sortable: true,
      width: '150px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}></span>,
      selector: row => row.view,
      sortable: true,
      width: '110px'
    },
  ];

  return (
    <>
      <div className="wrap-table-prod">
        <div style={{display: !isShowInfo ? 'block' : 'none'}}>
          <div className='-header-table-prd' style={{
            borderBottom: "1px solid gray",
            borderRadius: "5px 5px 0 0"
          }}>
            <div className='-header-lef'>
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng"
                value={search}
                onChange={handleFilter}
                style={{
                  marginRight: '10px',
                  padding: '10px',
                  width: '300px',
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderTop: 'none',
                  background: 'rgba(251, 251, 251, 0.971)',
                  outline: 'none',
                  borderRadius: '5px 5px 0 0'
                }}
              />
            </div>
          </div>

          <div style={{ maxHeight: '100%', overflowY: 'auto', borderRadius: "10px"}}>
            <DataTable
              columns={columns}
              data={filteredData}
              fixedHeader
              fixedHeaderScrollHeight="550px"
              responsive
              highlightOnHover
              striped
              pagination={false}
              className="small-font-table" 
            />
          </div>
        </div>
    
        <div className="wrap-prd-info">
            <OrderInfo isOpen={isShowInfo} isBackPrdList={handleInfoPrd}/>
        </div>
      </div>
    </>
  );
};

export default ShowOrders;
