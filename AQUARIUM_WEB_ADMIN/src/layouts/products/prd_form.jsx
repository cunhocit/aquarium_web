/* eslint-disable react/prop-types */
import { useRef } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddPrdForm({isForm}) {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    return(
        <>
        <div className="-add-prd-form"
            style={{display: !isForm ? 'flex' : 'none'}}
        >
            <label className="value_box" htmlFor="">
                <p>ID sản phẩm</p>
                <input type="text" disabled/>
            </label>

            <label className="value_box" htmlFor="">
                <p>Danh mục</p>
                <select name="" id="">
                    <option value="">Cá cảnh</option>
                    <option value="">Cây thủy sinh</option>
                    <option value="">Thức ăn</option>
                    <option value="">Phụ kiện</option>
                </select>
            </label>

            <label className="value_box" htmlFor="">
                <p>Tên sản phẩm</p>
                <input type="text" />
            </label>

            <label className="value_box" htmlFor="">
                <p>Mô tả</p>
                <textarea name="" id=""></textarea>
            </label>

            <label htmlFor="" className="value_box">
                <p>Giá tiền</p>
                <input type="number" min={0} />
            </label>

            <label htmlFor="" className="value_box">
                <p>Hình ảnh</p>
                <input type="file" name="" id="" ref={fileInputRef}/>
                <div className="-upload-file" onClick={handleUploadClick}>
                    <FontAwesomeIcon icon={faUpload} />
                    <p>UPLOAD FILE</p>
                </div>
            </label>

            <div className="-add-prd-btn">+ Thêm sản phẩm</div>
        </div>
        </>
    )
}

export function AddDirForm({isForm}) {

    return(
        <>
        <div className="-add-directory-form"
            style={{display: isForm ? 'flex' : 'none'}}
        >
            <label className="value_box" htmlFor="">
                <p>Danh mục hiện có</p>
                <select name="" id="">
                    <option value="">Cá cảnh</option>
                    <option value="">Cây thủy sinh</option>
                    <option value="">Thức ăn</option>
                    <option value="">Phụ kiện</option>
                </select>
            </label>

            <label htmlFor="" className="value_box">
                <p>Tên danh mục</p>
                <input type="text" />
            </label>

            <div className="-add-prd-btn">+ Thêm danh mục</div>
        </div>
        </>
    )
}
