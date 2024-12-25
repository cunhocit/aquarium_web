/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSignOut, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useGetAdmin } from "../../hooks/useAdmin";
import { adminUpadeValid } from "../../app/valid/adminValid";
import { updateAdmin, updateAvatar } from "../../app/api/adminApi";
import { Link } from "react-router-dom";

export default function SettingsLayout() {
    const targetInputFile = useRef(null);
    const [admin, setAdmin] = useState([]);
    const {data, fetchData, isLoading} = useGetAdmin();
    const [isdisabled , setDisabled] = useState(true);

    useEffect(() => {
        setAdmin(data);
    }, [data]);

    if (isLoading) return <div>Đang tải...</div>
    
    const handleUnlockDisabled = () => {
        setDisabled(prev => !prev);
    }

    const handleUpdateAdmin = async () => {
        const admin_ = {
            id: admin.id,
            gender: admin.gender,
            birth_date: admin.birth_date,
            email: admin.email,
            phone: admin.phone,
        }
        if (adminUpadeValid(admin_)) {
            await updateAdmin(admin);
            handleUnlockDisabled();
        }
    }

    const handleUpdateAvt = () => {
        targetInputFile.current.click();
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const admin_id = localStorage.getItem('id_admin');
        if (selectedFile && admin_id) {
            await updateAvatar({
                id: admin_id,
                file: selectedFile
            }).then(
                data => {
                    console.log(data.message);
                    
                    if (data.message) {
                        fetchData();
                    }
                }
            ).catch(error => {
                console.log("error: ", error);
                throw error;
            })
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <>
        <div className="wrap-admin-space">
            <h3>Thông tin chung</h3>
            <hr />

            <div className="admin-info">
                <div className="-w-admin-info">
                    <label htmlFor="" className="value_admin_box">
                        <p>Mã quản trị viên</p>
                        <input type="text" disabled 
                            value={admin.id}
                        />
                    </label>

                    <label htmlFor="" className="value_admin_box">
                        <p>Họ và tên</p>
                        <input type="text" disabled={isdisabled}
                            value={admin.name}
                            onChange={e => setAdmin({...admin, name: e.target.value})}
                        />
                    </label>

                    <label htmlFor="" className="value_admin_box">
                        <p>Giới tính</p>
                        <select disabled={isdisabled}
                            value={admin.gender}
                            onChange={e => setAdmin({...admin, gender: e.target.value})}
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </label>

                    <label htmlFor="" className="value_admin_box">
                        <p>Ngày sinh</p>
                        <input type="date" disabled={isdisabled}
                            value={admin.birth_date}
                            onChange={e => setAdmin({...admin, birth_date: e.target.value})}
                        />
                    </label>

                    <label htmlFor="" className="value_admin_box">
                        <p>Email</p>
                        <input type="email" disabled={isdisabled}
                            value={admin.email}
                            onChange={e => setAdmin({...admin, email: e.target.value})}
                        />
                    </label>

                    <label htmlFor="" className="value_admin_box">
                        <p>Số điện thoại</p>
                        <input type="phone" disabled={isdisabled}
                            value={admin.phone}
                            onChange={e => setAdmin({...admin, phone: e.target.value})}
                        />
                    </label>
                    
                    <label htmlFor="" className="value_admin_box">
                        <p>Ngày đăng ký</p>
                        <input type="text" disabled={true}
                            value={new Date(admin.created_at).toLocaleString()}
                            onChange={e => setAdmin({...admin, created_at: e.target.value})}
                        />
                    </label>

                    {!isdisabled && (
                        <div className="-settings-btn" onClick={handleUpdateAdmin}>Cập nhật thông tin</div>
                    )}
                </div>

                <div className="wrap-setting-func">
                    <img src={`http://localhost:8080/api/admins/images/${admin.image ? admin.image : 'image.png'}`} alt="" />

                    <div className="-setting-upload-avt" onClick={handleUpdateAvt}>
                        <input type="file" hidden ref={targetInputFile}
                            onChange={handleFileChange}
                        />
                        <FontAwesomeIcon icon={faUpload} />
                        <p>Cập nhật avatar</p>
                    </div>
                </div>
            </div>

            <div className="-w-setting-button">
                <div className="-setting-button-item" >
                    <FontAwesomeIcon icon={faLock} />
                    <Link to={'/change_password'}>Đổi mật khẩu</Link>
                </div>

                <div className="-setting-button-item" onClick={handleUnlockDisabled}>
                    <FontAwesomeIcon icon={faLock} />
                    <p>Chỉnh sửa thông tin</p>
                </div>
                
                <div className="-setting-button-item" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOut}/>
                    <p>Đăng xuất</p>
                </div>
            </div>
        </div>
        </>
    )
}