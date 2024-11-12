/* eslint-disable react/prop-types */
import { useState } from "react";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddPrdForm, { AddDirForm } from "./prd_form";

export default function AddPrd({isOpen, backPrdForm}) {

    const [isForm, setForm] = useState(false);
    const changeForm = (event) => {
        const value = event.target.value;
        if (value === 'add-prd') {
            setForm(false);
        }
        if (value === 'add-dir') {
            setForm(true);
        }
    }

    return(
        <>
            <div className="wrap-add-prd"
             style={{display: isOpen ? 'flex' : 'none'}}
            >
                <div className="wrap-lef-add-prd">
                    <div className="wrap-header-command">
                        <select name="" id="" className="-choose-add-form"
                            onClick={changeForm}
                        >
                            <option value="add-prd">Thêm sản phẩm</option>
                            <option value="add-dir">Thêm danh mục</option>
                        </select>
                        <div className="-left-back-prd-list" onClick={backPrdForm}>
                            <FontAwesomeIcon icon={faBackwardStep} />
                            Trở về    
                        </div>
                    </div>

                    <div>
                        <AddPrdForm isForm={isForm}/>
                        <AddDirForm isForm={isForm} />
                    </div>
                </div>

                <div className="wrap-right-add-prd"
                    style={{display: !isForm ? 'flex' : 'none'}}
                >
                    <h3>Hình ảnh sản phẩm</h3>
                    <img src="/public/logo-black.png" alt="" />
                </div>
            </div>
        </>
    )
}