/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { RegisterAPI } from '../app/api/auth';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePasswordC] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = () => {
        RegisterAPI(name, email, password, rePassword, phone);
    }

    return (
        <HelmetProvider>
            <Helmet> <title>Đăng ký</title> </Helmet>
            <div className="wrap-form-register ">
                <div className="login-box">
                    <h1>Đăng ký
                        <FontAwesomeIcon icon={faLeaf} />
                    </h1>

                    <div className="input-box">
                        <label htmlFor="">
                            <FontAwesomeIcon icon={faUser} />
                            <input type="text" placeholder='Họ và tên' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>

                        <label htmlFor="">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="email" placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label htmlFor="">
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" placeholder="Mật khẩu" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <label htmlFor="">
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" placeholder="Nhập lại mật khẩu" 
                                value={rePassword} 
                                onChange={(e) =>setRePasswordC(e.target.value)}
                            />
                        </label>

                        <label htmlFor="">
                            <FontAwesomeIcon icon={faPhone} />
                            <input type="phone" placeholder="Số điện thoại" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </label>
                    </div>
                    
                    <div className='hr-box'>
                        <hr />
                        <FontAwesomeIcon icon={faLeaf} />
                        <hr />
                    </div>

                    <div className='login-box-btn'>
                        <button className='login-btn' onClick={handleRegister}>
                            Đăng ký tài khoản
                            <FontAwesomeIcon icon={faLeaf} style={{marginLeft: '5px'}}/>
                        </button>
                    </div>

                    <div className="label-login">
                        <p>Đã có tài khoản!!...</p>
                        <Link to={'/login'}><p>Đăng nhập</p></Link>
                    </div>

                    <div className='bottom-box'>
                        <div className='box-icons'>
                            <FontAwesomeIcon className='fa-fb' icon={faFacebook} />
                            <FontAwesomeIcon className='fa-gg' icon={faGoogle} />
                            <FontAwesomeIcon className='fa-tt' icon={faTwitter} />
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}