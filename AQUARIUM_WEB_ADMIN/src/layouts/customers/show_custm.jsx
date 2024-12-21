/* eslint-disable no-unused-vars */
import DataTable from "react-data-table-component";
import { getAllCusAPI } from "../../app/api/customersApi";
import { useGetCustomers } from "../../hooks/useCustomer";
import { useState } from "react";
import { Link } from "react-router-dom";

const ShowCustomers = () => {

  const columns = [
    {
      name: <span style={{ fontSize: "0.9rem" }}> ID </span>,
      selector: (row) => row.id,
      sortable: true,
      width: "50px",
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Họ và tên </span>,
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Email </span>,
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Số điện thoại </span>,
      selector: (row) => row.phone,
      sortable: true,
      width: "140px",
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Ngày đăng ký </span>,
      selector: (row) => {
        const date = new Date(row.created_at);
        return date.toLocaleString();
      },
      sortable: true,
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Số dư </span>,
      selector: (row) =>  new Intl.NumberFormat('vi-VN').format(row.balance),
      sortable: true,
      width: "140px",
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}> Trạng thái </span>,
      selector: (row) => (row.status == 1 ? "Offline" : "Online"),
      sortable: true,
      cell: (row) => (
        <span style={{ color: row.status === 1 ? "red" : "green" }}>
          {row.status == 1 ? "Offline" : "Online"}
        </span>
      )
    },
    {
      name: <span style={{ fontSize: "0.9rem" }}>Hành động</span>,
      cell: row => (
      <Link style={{cursor: 'pointer', color: 'black'}}
        to={`/customer_info/${row.id}`}
      >
        [Xem chi tiết]
        </Link>)
    },
  ];

  const { data, fetchData, isLoading } = useGetCustomers();
  const [search, setSearch] = useState("");

  if (isLoading) return <div>Đang tải...</div>
  
  const filterData = data.filter(
    (item) => item.name && item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="wrap-table-prod">
        <div >
          <div
            className="-header-table-prd"
            style={{
              borderRadius: "5px",
            }}
          >
            <div className="-header-lef">
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng"
                style={{
                  marginRight: "10px",
                  padding: "10px",
                  width: "300px",
                  border: '1px solid #38383849',
                  background: "rgb(255, 255, 255)",
                  outline: "none",
                  borderRadius: "5px",
                }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="-table-prd"
          >
            <DataTable
              columns={columns}
              data={filterData}
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

export default ShowCustomers;
