/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect, useState } from "react";
import { updatePrdImageAPI } from "../../app/api/productsApi";
import { PrdInfoCpn } from "./_prd_info_cpn";

export default function ProductInfoLayout({data, id, isLoading}) {
  if (isLoading) return <div>Đang tải dữ liệu</div>

  const fileInputRef = useRef(null);
  const [product, setProduct] = useState([]);

  const products = data.products;
  useEffect(() => {
    const _product = products.find((p) => p.id === parseInt(id));
    setProduct(_product);
  }, [id, products]);

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  }

  const handleUploadFile = async (e) => {
    const selectedFile = e.target.files[0];
    const time = (new Date()).getTime();
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('file', selectedFile);
      formData.append('time', time);
      formData.append('fileExtension', fileExtension);
      await updatePrdImageAPI(formData).then(
        response => {
          if (response.message) setProduct({...product, image: id + '_' + time + '.' + fileExtension});
        }
      );
    }
    else alert('Vui lòng chọn đúng định dạng file!');
  }
  
  return (
    <div className="wrap-add-prd">
      <PrdInfoCpn data={data} id={id} />

      <div className="wrap-right-add-prd">
        <h3>Hình ảnh sản phẩm</h3>
        <img src={`http://localhost:8080/api/products/images/${product.image ? product.image : 'image.png'}`} alt="" />
        <input type="file" ref={fileInputRef} hidden onChange={handleUploadFile} />
        <div className="-upload-file" onClick={handleClickFileInput} >
          <FontAwesomeIcon icon={faUpload} />
          <p>UPLOAD FILE</p>
        </div>
      </div>
    </div>
  );
}

