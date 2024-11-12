/* eslint-disable react/prop-types */

import { faBackwardStep, faGear, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";

export default function ProductInfo({isOpen, isBackPrdList}) {
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
                <h3>Chi tiết sản phẩm</h3>
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
                    <p>Mã sản phẩm</p>
                    <input type="text"  disabled={!isUnlockInput}/>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Danh mục</p>
                    <select name="" id="" disabled={!isUnlockInput}>
                        <option value="">Cá cảnh</option>
                        <option value="">Cây thủy sinh</option>
                        <option value="">Thức ăn</option>
                        <option value="">Phụ kiện</option>
                    </select>
                </label>

                <label className="value_box" htmlFor="">
                    <p>Tên sản phẩm</p>
                    <input type="text" disabled={!isUnlockInput} />
                </label>

                <label className="value_box" htmlFor="">
                    <p>Mô tả</p>
                    <textarea name="" id=""  disabled={!isUnlockInput}></textarea>
                </label>

                <label htmlFor="" className="value_box">
                    <p>Giá tiền</p>
                    <input type="number" min={0}  disabled={!isUnlockInput}/>
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