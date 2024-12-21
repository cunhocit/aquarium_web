/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrdersByPrdName } from "../../app/api/ordersApi";
import { deletePrdAPI } from "../../app/api/productsApi";
import { useProducts } from "../../hooks/useProducts";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const ShowPrd = () => {
  const [search, setSearch] = useState('');
  const [zoomImg, setZoomImg] = useState(false);
  const [image, setImage] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const {data, isLoading, fetchData} = useProducts();

  useEffect(() => {
    if (!isLoading) {
      setProducts(data.products);
      setCategories(data.categories);
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Đang tải dữ liệu</div>

  const handleZoom = (e) => {
    setImage(e);
    setZoomImg(prev => !prev);
  }

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())&&
    categoryFilter === 'Tất cả' || item.category === categoryFilter
  );

  const handleDelete = async (id, name) => {
    const mess_ = "Nhắc lại!\nSản phẩm '" + name +"' có các đơn hàng liên quan.\nNếu xóa sản phẩm thì các đơn hàng đang có cũng sẽ bị xóa";
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        let order_ = null;
        await getOrdersByPrdName(name).then(
          data => {
            if (data.data) {
              order_ = data.data.orders;
            }
          }
        );
        
        if (order_.length >= 0 && window.confirm(mess_)) {
          await deletePrdAPI({name: name});
          fetchData();
        }
      } catch (error) {
        console.error("Xóa sản phẩm thất bại: ", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm.");
      }
    }
  };

  const columns = [
    {
      name: <span style={{ fontSize: "0.9rem" }}> ID </span>,
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Danh mục </span>,
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Tên sản phẩm </span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Hình ảnh </span>,
      selector: (row) => row.image,
      sortable: true,
      cell: (row) => (
        <img  src={`http://localhost:8080/api/products/images/${row.image ? row.image : 'image.png'}`} 
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                padding: '0.3rem',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
              onClick={() => handleZoom(row.image)}
        />
      ),
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Giá bán </span>,
      selector: (row) => new Intl.NumberFormat("vi-VN").format(row.price),
      sortable: true,
      width: '180px'
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Sửa </span>,
      cell: (row) => (
        <Link to={`/product_info/${row.id}`}>
          <FontAwesomeIcon icon={faWrench} style={{ cursor: "pointer", color: 'black' }} />
        </Link>
      ),
      sortable: true,
      width: "80px",
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Xóa </span>,
      cell: (row) => (
        <FontAwesomeIcon
          icon={faTrash}
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(row.id, row.name)}
        />
      ),
      sortable: true,
      width: "80px",
    },
  ];

  return (
    <>
      <div className="wrap-table-prod" >
        <div >
          <div className="-header-table-prd"
            style={{
              borderRadius: "5px 5px 0 0",
            }}
          >
            <div className="-header-lef">
              <select className="-header-select" name="" id=""
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
              >
                <option value="Tất cả">Tất cả</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>

              <input  className="-input-search" type="text" placeholder="Tìm kiếm sản phẩm" 
                value={search}
                onChange={handleFilter} 
              />
            </div>

            <div className="-header-add-btn">
              <Link to={'/add_product'}>
                <FontAwesomeIcon icon={faAdd} />
                Thêm
              </Link>
            </div>
          </div>

          <div className="-table-prd" >
            <DataTable
              columns={columns}
              data={filteredData}
              fixedHeader
              fixedHeaderScrollHeight="100%"
              responsive
              highlightOnHover
              striped
              pagination={false}
            />
          </div>
        </div>
      </div>

      <div  style={{display: zoomImg ? 'flex' : 'none'}}  className="-prd-show-mage" onClick={handleZoom}>
        <img src={`http://localhost:8080/api/products/images/${image ? image : 'image.png'}`} />
      </div>
    </>
  );
};

export default ShowPrd;
