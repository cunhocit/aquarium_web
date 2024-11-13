/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { faBackwardStep, faGear, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CustomerInfo({isOpen, isBackPrdList}) {
    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const [isUnlockInput, setUnlockInput] = useState(false);
    const handleUnlockInput = () => {
        setUnlockInput(prev => !prev);
    }

    return(
    <>
    <div className="wrap-add-prd" style={{display: isOpen ? 'flex' : 'none'}}>
        <div className="wrap-lef-add-prd">
            <div className="wrap-header-command">
                <h3>Chi tiết đơn hàng</h3>
                <div className="gr-btn">
                    <div className="-left-back-prd-list" onClick={handleUnlockInput}>
                        <FontAwesomeIcon icon={faGear} />
                        Chỉnh sửa
                    </div>
                    <div className="-left-back-prd-list" onClick={isBackPrdList}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                        Trở về    
                    </div>
                </div>
            </div>

            <div className="-add-prd-form" >
                <label className="value_box" htmlFor="">
                    <p>ID khách hàng</p>
                    <input type="text" disabled/>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Họ và tên</p>
                    <input type="text" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Số điện thoại</p>
                    <input type="phone"  disabled={!isUnlockInput}/>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Email</p>
                    <input type="email" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Ngày đăng ký</p>
                    <input type="date" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Tổng chi tiêu</p>
                    <input type="number" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Trạng thái</p>
                    <input type="text" />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Trang thái</p>
                    <select name="" id=""  disabled={!isUnlockInput}>
                        <option value="">Online</option>
                        <option value="">Offline</option>
                    </select>
                </label>

                <label htmlFor="" className="value_box">
                    <p>Hình ảnh</p>
                    <input type="file" name="" id="" ref={fileInputRef}  disabled={!isUnlockInput}/>
                    <div className="-upload-file" onClick={handleUploadClick} >
                        <FontAwesomeIcon icon={faUpload} />
                        <p>UPLOAD FILE</p>
                    </div>
                </label>
            </div>

            <div className="-add-prd-btn">Cập nhật</div>
        </div>
        
        <div className="wrap-right-add-prd">
            <h3>Avatar</h3>
            <img src="/public/logo-black.png" alt="" />
        </div>
    </div>
    </>
    )
}