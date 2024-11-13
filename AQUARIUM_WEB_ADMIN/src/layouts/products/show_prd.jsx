/* eslint-disable react/prop-types */
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import ProductInfo from './prd_info';

const ShowPrd = ({isOpen, handleOpenAdd}) => {
  const [search, setSearch] = useState('');

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  const [isShowInfo, setShowInfo] = useState(false);
  const handleInfoPrd = () => {
    setShowInfo(prev => !prev);
  }

  const data = [
    {
      id: 'C001',
      name: 'Cá Betta Xanh',
      image: 'link-to-betta-fish-image1.jpg',
      remaining: 30,
      price: '120.000 VND',
      delete: <FontAwesomeIcon icon={faTrash} />,
      fix: <FontAwesomeIcon icon={faWrench} />,
      view: <div style={{color: 'black', cursor: 'pointer'}} onClick={() => handleInfoPrd()}>[Xem chi tiết]</div>
    }
  ];

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: <span style={{ fontSize: '0.9rem' }}> ID </span>,
      selector: row => row.id,
      sortable: true,
      width: '100px'
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
      width: '180px'
    },
    {
      name: <span
              style={{
                  fontSize: '0.9rem'
              }}
          >
              Hình ảnh
          </span>,
      selector: row => row.image,
      sortable: true,
      width: '180px'
    },
    {
      name: <span
              style={{
                  fontSize: '0.9rem'
              }}
          >
              Số lượng
          </span>,
      selector: row => row.remaining,
      sortable: true,
    },
    {
      name: <span
              style={{
                  fontSize: '0.9rem'
              }}
          >
              Giá bán
          </span>,
      selector: row => row.price,
      sortable: true,
    },
    {
      name: <span
              style={{
                  fontSize: '0.9rem',
              }}
          >
              Sửa
          </span>,
      selector: row => row.delete,
      sortable: true,
      width: '80px',
    },
    {
      name: <span
              style={{
                  fontSize: '0.9rem'
              }}
          >
              Xóa
          </span>,
      selector: row => row.fix,
      sortable: true,
      width: '80px'
    },
    {
      name: <span
              style={{
                  fontSize: '0.9rem'
              }}
          >
          </span>,
      selector: row => row.view,
      sortable: true,
    },
  ];


  return (
    <>
    <div className="wrap-table-prod" style={{
          display: !isOpen ? 'block' : 'none'
        }}>

        <div style={{display: !isShowInfo ? 'block' : 'none'}}>
          <div className='-header-table-prd' style={{
              borderBottom: "1px solid gray",
              borderRadius: "5px 5px 0 0"
          }}>
            <div className='-header-lef'>
                <select className="-header-select" name="" id="">
                    <option value="">Cá cảnh</option>
                    <option value="">Cây thủy sinh</option>
                    <option value="">Thức ăn</option>
                    <option value="">Phụ kiện</option>
                </select>
                
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
                    }}
                />
            </div>

            <div className='-header-add-btn' onClick={handleOpenAdd}>
                <FontAwesomeIcon icon={faAdd}/>
                Thêm
            </div>
          </div>

          <div style={{maxHeight: '100%', overflowY: 'auto', borderRadius: "10px" }}>
            <DataTable
              columns={columns}
              data={filteredData}
              fixedHeader
              fixedHeaderScrollHeight="550px"
              responsive
              highlightOnHover
              striped
              pagination={false}
            />
          </div>
        </div>
    
        <div className="wrap-prd-info">
          <ProductInfo isOpen={isShowInfo} isBackPrdList={handleInfoPrd}/>
        </div>
    </div>
    </>
  );
};

export default ShowPrd;
