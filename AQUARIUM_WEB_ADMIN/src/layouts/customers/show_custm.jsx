/* eslint-disable react/prop-types */
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import CustomerInfo from './custm_info';

const ShowCutomers = () => {
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
        customerId: 'CUS001',
        customerName: 'Nguyễn Văn A',
        email: 'abc@gmail.com',
        phone: '0365669884',
        dateRegis: '22/12/2024',
        totalExp: '2,000,000 VND',
        status: 'online',
        view: <div style={{color: 'black', cursor: 'pointer'}} onClick={() => handleInfoPrd()} >[Xem chi tiết]</div>
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
      selector: row => row.customerId,
      sortable: true,
      width: '100px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Họ và tên </span>,
      selector: row => row.customerName,
      sortable: true,
      width: '150px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Email </span>,
      selector: row => row.email,
      sortable: true,
      width: '150px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Số điện thoại </span>,
      selector: row => row.phone,
      sortable: true,
      width: '140px',
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Ngày đăng ký </span>,
      selector: row => row.dateRegis,
      sortable: true,
      width: '140px'
    },
    {
      name: <span style={{ fontSize: '0.9rem' }}> Tổng chi tiêu </span>,
      selector: row => row.totalExp,
      sortable: true,
      width: '150px'
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
      width: '120px'
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
            <CustomerInfo isOpen={isShowInfo} isBackPrdList={handleInfoPrd}/>
        </div>
      </div>
    </>
  );
};

export default ShowCutomers;
