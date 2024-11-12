/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { faBackwardStep, faGear, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderInfo({isOpen, isBackPrdList}) {
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
                    <p>Mã đơn hàng</p>
                    <input type="text" disabled={!isUnlockInput}/>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Tên khách hàng</p>
                    <input type="text" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Sản phẩm</p>
                    <input type="text"  disabled={!isUnlockInput}/>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Số lượng</p>
                    <input type="text" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Giá trị</p>
                    <input type="text" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Ngày đặt hàng</p>
                    <input type="text" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Phương thức thanh toán</p>
                    <input type="text" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Trang thái</p>
                    <select name="" id=""  disabled={!isUnlockInput}>
                        <option value="">Đã hủy</option>
                        <option value="">Đang xử lý</option>
                        <option value="">Hoàn thành</option>
                        <option value="">Đang vận chuyển</option>
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
            <h3>Hình ảnh sản phẩm</h3>
            <img src="/public/logo-black.png" alt="" />
        </div>
    </div>
    </>
    )
}