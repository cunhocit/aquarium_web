/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { faBackwardStep, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchCategories } from "../../hooks/useProducts";
import { useEffect, useRef, useState } from "react";
import { addPrdAPI } from "../../app/api/productsApi";
import { AddCategoriesForm } from "./add_categories";
import { Link } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
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

export default function AddPrd() {
  const [isOpen, setOpen] = useState(true);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState();
  const [URLImage, setURLImage] = useState('');
  const fileInputRef = useRef(null);
  const { categories, fetchData, isLoading } = useFetchCategories();

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0].category);
    }
  }, [categories]);
  
  if (isLoading) return <div>Đang tải dữ liệu...</div>

  const handleChangeForm = (e) => {
    if (e === 'add_prd') {
      setOpen(true);
    }
    if (e === 'add_dir') {
      setOpen(false);
    }
  }

  const handleUploadFile = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(selectedFile.type)) {
          alert('Vui lòng chọn file ảnh (jpg, jpeg, png)');
          return;
      }
      setImage(selectedFile);
      setURLImage(URL.createObjectURL(selectedFile));
    }
  }

  const handleAddPrd = async () => {
    if (!name.trim()) {
      alert('Vui lòng nhập tên sản phẩm');
      return;
    }
    if (!description.trim()) {
        alert('Vui lòng nhập mô tả sản phẩm');
        return;
    }
    if (!price || price < 0) {
        alert('Vui lòng nhập giá hợp lệ');
        return;
    }
    if (!image) {
        alert('Vui lòng chọn hình ảnh sản phẩm');
        return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category); 
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    await addPrdAPI(formData).then(response => {
    }).catch(error => {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert('Có lỗi xảy ra khi thêm sản phẩm');
    });

    setCategory(categories[0].category);
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setURLImage('');
  }
  
  return (
    <>
      <div className="wrap-add-prd">
        <div className="wrap-lef-add-prd">
          <div className="wrap-header-command">
            <select
              name=""
              id=""
              onChange={e => handleChangeForm(e.target.value)}
              className="-choose-add-form"
            >
              <option value='add_prd'>Thêm sản phẩm</option>
              <option value='add_dir'>Thêm danh mục</option>
            </select>
            <div className="-left-back-prd-list">
              <Link to={'/products'}>
                <FontAwesomeIcon icon={faBackwardStep} />
                Trở về
              </Link>
            </div>
          </div>

          <div className="-add-prd-form" style={{display: isOpen ? 'flex' : 'none'}}>
            <label className="value_box" htmlFor="">
              <p>Danh mục</p>
              <select value={category}
                      onChange={e => setCategory(e.target.value)}
              >
                {categories.map( (c) => (
                  <option key={c.id} value={c.category}>{c.category}</option>
                ))}
              </select>
            </label>

            <label className="value_box" htmlFor="">
              <p>Tên sản phẩm</p>
              <input type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
              />
            </label>

            <label className="value_box" htmlFor="">
              <p>Mô tả</p>
              <ReactQuill
                className="-add-prd-react-quill"
                value={description} 
                onChange={setDescription} 
                modules={modules}
                formats={formats}
              />
            </label>

            <label htmlFor="" className="value_box">
              <p>Giá tiền</p>
              <input  type="text"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      min={0}
              />
            </label>

            <label className="value_box">
                <p>Hình ảnh</p>
                <input  type="file" ref={fileInputRef} hidden
                        onChange={handleUploadFile}
                />
                <div className="-upload-file" >
                  <FontAwesomeIcon icon={faUpload} />
                  <p>UPLOAD FILE</p>
                </div>
              </label>

            <div className="-add-prd-btn"  onClick={handleAddPrd} >+ Thêm sản phẩm</div>
          </div>

          <AddCategoriesForm isOpen={isOpen} categories={categories} fetchData={fetchData}/>
        </div>

        <div className="wrap-right-add-prd" style={{display: isOpen ? 'flex' : 'none'}} >
          <h3>Hình ảnh sản phẩm</h3>
          {URLImage ? (<img src={URLImage} alt="" />) : (<p>Chưa chọn hình ảnh</p>)}
        </div>
      </div>
    </>
  );
}
