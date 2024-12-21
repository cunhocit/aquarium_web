/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import Sidebar from '../../layouts/sidebar';
import Header from '../../layouts/header';
import SettingsLayout from '../../layouts/settings/setting_layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faKey, faLock, faSignOut, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ChangePasswordAPI, getAdminAPI } from '../../app/api/adminApi';
import { encryptAES, hashPassword } from '../../app/security/CryptAES';

export default function ChangePassword() {
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [admin, setAdmin] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = localStorage.getItem('id_admin');
        if (id) {
            const fetchAdmin = async () => {
                await getAdminAPI(id).then(
                    response => {
                        if (response.data) {
                            setAdmin(response.data);
                            setLoading(false);
                        }
                    }
                ).catch(error => {
                    console.log(error);
                    throw error;
                })
            }
            fetchAdmin();
        }
    }, []);
    if (loading) return <div>Đang tải...</div>
    if (admin.image === "") admin.image = 'image.png';  

    const handleChangePassword = async () => {
        if (password === newPassword) {
            alert("Mật khẩu mới không được giống mật khẩu cũ!");
            return;
        }
        if (newPassword != confirmPassword) {
            alert("Xác nhận mật khẩu không trùng khớp");
            return;
        }

        const pass_box = new FormData();
        pass_box.append('id', localStorage.getItem('id_admin'));
        pass_box.append('password', hashPassword(password));
        pass_box.append('new_password', hashPassword(newPassword));

        await ChangePasswordAPI(pass_box);
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    return(
        <>
            <div className='wrap-home-page'>
                <Helmet><title>Cài đặt</title></Helmet>
                <Sidebar />
                <div className='wrap-work-space'>
                    <div className="wrap-settings">
                        <Header />

                        <div className="title_box">
                            <FontAwesomeIcon icon={faGear} />
                            <h2 className="products-title">Cài đặt</h2>
                        </div>

                        <div className="wrap-body-settings">
                            <div className="wrap-admin-space">
                                <h3>Đổi mật khẩu</h3>
                                <hr />

                                <div className="admin-info">
                                    <div className="-w-admin-info">
                                        <label htmlFor="" className="value_admin_box">
                                            <p><FontAwesomeIcon icon={faLock}/>  Mật khẩu cũ</p>
                                            <input type="password" 
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </label>
                                            
                                        <label htmlFor="" className="value_admin_box">
                                            <p><FontAwesomeIcon icon={faLock}/>  Mật khẩu mới</p>
                                            <input type="password"
                                                value={newPassword}
                                                onChange={e => setNewPassword(e.target.value)}
                                            />
                                        </label>

                                        <label htmlFor="" className="value_admin_box">
                                            <p><FontAwesomeIcon icon={faLock}/>  Mật khẩu mới</p>
                                            <input type="password" 
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                            />
                                        </label>

                                        <div className="-settings-btn" onClick={handleChangePassword}>Đổi mật khẩu</div>
                                    </div>
                                    
                                    <div className="wrap-setting-func">
                                        <img src={`http://localhost:8080/api/admins/images/${admin.image ? admin.image : 'image.png'}`} alt="" />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}