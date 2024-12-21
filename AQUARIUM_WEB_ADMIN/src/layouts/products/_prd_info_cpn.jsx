/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { updatePrdAPI } from "../../app/api/productsApi";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image',
];

export function PrdInfoCpn({data, id}) {
    const [isUnlockInput, setUnlockInput] = useState(false);
    const [product, setProduct] = useState(null);

    const categories = data.categories;
    const products = data.products;

    useEffect(() => {
      const _product = products.find((p) => p.id === parseInt(id));
      setProduct(_product);
    }, [id]);

    if (product === null) return <div>Đang tải</div>
  
    const handleUnlockInput = () => setUnlockInput(prev => !prev);
    const handleUpdateProduct = async () => {
      await updatePrdAPI(product);
      handleUnlockInput();
    }

    return (
        <>
        <div className="wrap-lef-add-prd">
        <div className="wrap-header-command">
          <h3>Chi tiết sản phẩm</h3>
          <div className="gr-btn">
            <div className="-left-back-prd-list" onClick={handleUnlockInput}>
              <FontAwesomeIcon icon={faGear} />
              Chỉnh sửa
            </div>
            <div className="-left-back-prd-list" >
              <Link to={'/products'}>
                <FontAwesomeIcon icon={faBackwardStep} />
                Trở về
              </Link>
            </div>
          </div>
        </div>

        <div className="-add-prd-form">
          <label className="value_box">
            <p>ID sản phẩm</p>
            <input type="text" disabled 
              value={product.id} 
              onChange={(e) => setProduct({...product, id: e.target.value})}
            />
          </label>

          <label className="value_box">
            <p>Danh mục</p>
            <select name="category" disabled={!isUnlockInput} 
              value={product.category}
              onChange={(e) => setProduct({...product, category: e.target.value})}
            >
             {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
             ))}
            </select>
          </label>

          <label className="value_box">
            <p>Tên sản phẩm</p>
            <input type="text" name="name" disabled={!isUnlockInput} 
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
            />
          </label>

          <label className="value_box">
            <p>Mô tả</p>
            <ReactQuill
                className="-add-prd-react-quill"
                value={product.description} 
                onChange={(e) => setProduct({...product, description: e})} 
                modules={modules}
                formats={formats}
              />
          </label>

          <label className="value_box">
            <p>Giá tiền</p>
            <input type="text" name="price" disabled={!isUnlockInput}
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
            />
          </label>

          <label className="value_box">
            <p>Số lượng</p>
            <input type="text" name="quantity" disabled={!isUnlockInput}
              value={product.quantity}
              onChange={(e) => setProduct({...product, quantity: e.target.value})}
            />
          </label>

          <label className="value_box">
            <p>Lượt mua</p>
            <input type="text" name="quantity" disabled
              value={product.turn_order}
              onChange={(e) => setProduct({...product, turn_order: e.target.value})}
            />
          </label>

          {isUnlockInput && <div className="-add-prd-btn" onClick={handleUpdateProduct} >Cập nhật</div>}
        </div>
      </div>
      </>
    );
}