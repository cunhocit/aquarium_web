import { useState } from 'react';
import DataTable from 'react-data-table-component';

const data = [
    { id: 'C001', name: 'Cà phê Arabica', sold: 50, action: '[Xem chi tiết]' },
    { id: 'C002', name: 'Cà phê Robusta', sold: 30, action: '[Xem chi tiết]'  },
    { id: 'C003', name: 'Cà phê Espresso', sold: 100, action: '[Xem chi tiết]'  },
    { id: 'C004', name: 'Cà phê Latte', sold: 70, action: '[Xem chi tiết]'  },
    { id: 'C005', name: 'Cà phê Cappuccino', sold: 40, action: '[Xem chi tiết]'  },
    { id: 'C006', name: 'Cà phê Mocha', sold: 200, action: '[Xem chi tiết]'  },
    { id: 'C007', name: 'Cà phê Cold Brew', sold: 150, action: '[Xem chi tiết]'  },
    { id: 'C008', name: 'Cà phê Macchiato', sold: 90, action: '[Xem chi tiết]'  },
    { id: 'C009', name: 'Cà phê Moka Pot', sold: 110, action: '[Xem chi tiết]'  },
    { id: 'C010', name: 'Cà phê Turkish', sold: 65, action: '[Xem chi tiết]'  },
  ];

// Các cột cho bảng
const columns = [
  {
    name: <span
            style={{
                fontSize: '0.9rem'
            }}
        >
            Mã
        </span>,
    selector: row => row.id,
    sortable: true,
  },
  {
    name: <span
            style={{
                fontSize: '0.9rem'
            }}
        >
            Tên sản phẩm
        </span>,
    selector: row => row.name,
    sortable: true,
  },
  {
    name: <span
            style={{
                fontSize: '0.9rem'
            }}
        >
            Số lượng bán
        </span>,
    selector: row => row.sold,
    sortable: true,
  },
  {
    name: <span
            style={{
                fontSize: '0.9rem'
            }}
        >
            Hành động
        </span>,
    selector: row => row.action,
    sortable: true,
  },
];

const Table = () => {
  const [search, setSearch] = useState('');

  // Hàm xử lý tìm kiếm
  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  // Lọc dữ liệu dựa trên tìm kiếm
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="wrap-top-prod">
      <div className='-header-top-prd' style={{
          borderBottom: "1px solid gray",
          borderRadius: "5px 5px 0 0"
        }}>
        <h3>Top sản phẩm bán chạy</h3>
        
        <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            value={search}
            onChange={handleFilter}
            style={{ 
                marginRight: '10px',
                padding: '10px', 
                width: '250px', 
                borderRight: 'none',
                borderLeft: 'none',
                borderTop: 'none',
                background: 'rgba(251, 251, 251, 0.971)',
                outline: 'none',
                borderRadius: "5px"
            }}
        />
      </div>

      {/* Bảng DataTable */}
      <div style={{ maxHeight: '330px', overflowY: 'auto' }}>
        <DataTable
          columns={columns}
          data={filteredData}
          fixedHeader
          fixedHeaderScrollHeight="330px"  // Giới hạn chiều cao cho phần thân cuộn
          responsive
          highlightOnHover
          striped
          pagination={false}  // Bỏ phân trang
        />
      </div>
    </div>
  );
};

export default Table;
