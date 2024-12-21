/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { faBackwardStep, faGear, faHistory, faRecycle, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetCustomerById } from "../../hooks/useCustomer";
import { updateImageCustomer, updateCusAPI } from "../../app/api/customersApi";
import { validUpdateCustomer } from "../../app/valid/cusValid";
import { validFile } from "../../app/valid/fileValid";
import { Link } from "react-router-dom";

export default function CustomerInfoLayout({id}) {
  const fileInputRef = useRef(null);
  const [isUnlockInput, setUnlockInput] = useState(false);
  const [customer, setCustomer] = useState([]);
  const {data, fetchData, isLoading} = useGetCustomerById(id);

  useEffect(() => {
    if (data) setCustomer(data);
  }, [data]);

  if (isLoading) return <div>Đang tải...</div>
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleUnlockInput = () => {
    setUnlockInput((prev) => !prev);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const time = (new Date()).getTime();
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    console.log("file: ", fileExtension);
    
    if (validFile(fileExtension)) {
      const fileUpdate = new FormData();
      fileUpdate.append("id", customer.id);
      fileUpdate.append("file", selectedFile);
      fileUpdate.append("time", time);

      if (selectedFile) {
        await updateImageCustomer(fileUpdate)
        .catch(error => {
            throw error;
        });
        fetchData();
     }
    }else alert('Vui lòng chọn đúng định dạng ảnh!');
  }

  const handleUpdateCustomer = async () => {
    if (validUpdateCustomer(customer)) {
      await updateCusAPI(customer);
    }
    handleUnlockInput();
  }

  return (
    <>
      <div className="wrap-add-prd" >
        <div className="wrap-add-prd" >
          <div className="wrap-lef-add-prd">
            <div className="wrap-header-command">
              <h3>Chi tiết khách hàng</h3>
            </div>

            {/* FIELD */}
            <div className="-add-prd-form">
              <label className="value_box" htmlFor="">
                <p>ID khách hàng</p>
                <input type="text" disabled 
                  value={customer.id}
                />
              </label>

              <label className="value_box" htmlFor="">
                <p>Họ và tên</p>
                <input
                  type="text"
                  name="cus_name"
                  disabled={!isUnlockInput}
                  value={customer.name}
                  onChange={e => setCustomer({...customer, name: e.target.value})}
                />
              </label>

              <label className="value_box" htmlFor="">
                <p>Giới tính</p>
                <select
                  name="gender"
                  disabled={!isUnlockInput}
                  value={customer.gender}
                  onChange={e => setCustomer({...customer, gender: e.target.value})}
                >
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                  <option value="2">Khác</option>
                </select>
              </label>

              <label className="value_box" htmlFor="">
                <p>Số điện thoại</p>
                <input
                  type="phone"
                  name="phone"
                  disabled={!isUnlockInput}
                  value={customer.phone}
                  onChange={e => setCustomer({...customer, phone: e.target.value})}
                />
              </label>

              <label className="value_box" htmlFor="">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  disabled={!isUnlockInput}
                  value={customer.email}
                  onChange={e => setCustomer({...customer, email: e.target.value})}
                />
              </label>

              <label className="value_box" htmlFor="">
                <p>Ngày sinh</p>
                <input
                  type="date"
                  name="birth_date"
                  disabled={!isUnlockInput}
                  value={customer.birth_date}
                  onChange={e => setCustomer({...customer, birth_date: e.target.value})}
                />
              </label>

              <label className="value_box" htmlFor="">
                <p>Ngày đăng ký</p>
                <input
                  type="text"
                  name="registration_date"
                  disabled
                  value={new Date(customer.created_at).toLocaleString()}
                  onChange={e => setCustomer({...customer, created_at: e.target.value})}
                />
              </label>

              <label className="value_box" htmlFor="">
                <p>Địa chỉ</p>
                <input
                  type="text"
                  name="address"
                  disabled={!isUnlockInput}
                  value={customer.address}
                  onChange={e => setCustomer({...customer, address: e.target.value})}
                />
              </label>

              <label className="value_box">
                <p>Số dư tài khoản</p>
                <input
                  type="text"
                  name="total_price"
                  disabled={!isUnlockInput}
                  value={customer.balance}
                  onChange={e => setCustomer({...customer, balance: e.target.value})}
                />
              </label>

              <label className="value_box" htmlFor="">
                <p>Trạng thái</p>
                <select
                  name="status"
                  disabled
                  value={customer.status}
                  onChange={e => setCustomer({...customer, status: e.target.value})}
                >
                  <option value="1">Online</option>
                  <option value="0">Offline</option>
                </select>
              </label>

              {isUnlockInput && (
                <div className="-add-prd-btn" onClick={handleUpdateCustomer}>
                  Cập nhật
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="wrap-right-add-prd" >
          <h3>Avatar</h3>
          <img src={`http://localhost:8080/api/customers/images/${customer.image ? customer.image : 'image.png'}`} />
          <input
            type="file"
            name=""
            id=""
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="-upload-file" onClick={handleUploadClick}>
            <FontAwesomeIcon icon={faUpload} />
            <p>UPLOAD FILE</p>
          </div>
          <div className="-upload-file" >
            <FontAwesomeIcon icon={faHistory} />
            <Link to={`/order_history/${customer.email}`}>Lịch sử</Link>
          </div>
          <div
            className="-upload-file"
            onClick={handleUnlockInput}
          >
            <FontAwesomeIcon icon={faGear} />
            Chỉnh sửa
          </div>
          <div className="-upload-file" >
            <FontAwesomeIcon icon={faRecycle} />
            <Link to={'/customer'} >Xóa</Link>
          </div>
          <div className="-upload-file" >
            <FontAwesomeIcon icon={faBackwardStep} />
            <Link to={'/customer'} >Trở về</Link>
          </div>
        </div>

      </div>
    </>
  );
}
