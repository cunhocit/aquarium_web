/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import DataTable from 'react-data-table-component';

const fontStyle = {
  fontSize: '0.9rem'
};

const columns = [
  {
    name: <span style={fontStyle}>Mã sản phẩm</span>,
    selector: row => row.id,
    sortable: true,
  },
  {
    name: <span style={fontStyle}>Tên sản phẩm</span>,
    selector: row => row.name,
    sortable: true,
  },
  {
    name: <span style={fontStyle}>Danh mục</span>,
    selector: row => row.category,
    sortable: true,
  },
  {
    name: <span style={fontStyle}>Số lượng bán</span>,
    selector: row => row.quantity,
    sortable: true,
    sortField: 'quantity',
    id: 'quantity'
  },
  {
    name: <span style={fontStyle}>Doanh thu</span>,
    selector: row => new Intl.NumberFormat('vi-VN').format(row.revenue),
    sortable: true,
  }
];


const filtelData = (products, revenues) => {
  let count = 0;
  let data = [];

  revenues.sort((a, b) => b.quantity - a.quantity);
  revenues.map(rev => {
    if (count<=5) {
      data.push({
        id: null,
        category: rev.category,
        name: rev.product,
        quantity: 0,
        revenue: 0,
      })
    }
    count++;
  });

  revenues.forEach(rev => {
    data.forEach(d => {
      if (d.name === rev.product) {
        d.quantity += rev.quantity; 
        d.revenue += rev.revenue;    
      }
    });
  });

  products.forEach(e => {
    data.forEach(d => {
      if (d.name === e.name) {
        d.id = e.id;
      }
    });
  });
  
  return data;
}

const Table = ({products, revenues}) => {
  const [search, setSearch] = useState('');

  let data = filtelData(products, revenues);

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="wrap-top-prod">
      <div className='-header-top-prd' style={{
          borderRadius: "5px 5px 0 0"
        }}>
        <h3>Top 5 sản phẩm bán chạy</h3>
        
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
          defaultSortAsc={false}
          defaultSortFieldId="quantity"
          pagination={false} 
          style={{cursor: 'pointer'}}
        />
      </div>
    </div>
  );
};

export default Table;
