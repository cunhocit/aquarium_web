import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Register_API } from '../app/api/auth';
import { RegisterValid } from '../app/valid/authValid';

export default function Register() {
    const CUSTOMER_DEFAULT = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
    }
    const [customer, setCustomer] = useState(CUSTOMER_DEFAULT)

    const handleRegister = () => {
        if (RegisterValid(customer)) {
            Register_API(customer);
            setCustomer(CUSTOMER_DEFAULT);
        }
    }

    return (
        <>
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
                                value={customer.name} 
                                onChange={(e) => setCustomer({...customer, name: e.target.value})}
                            />
                        </label>

                        <label htmlFor="">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="email" placeholder="Email" 
                                value={customer.email}
                                onChange={(e) => setCustomer({...customer, email: e.target.value})}
                            />
                        </label>

                        <label htmlFor="">
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" placeholder="Mật khẩu" 
                                value={customer.password} 
                                onChange={(e) => setCustomer({...customer, password: e.target.value})}
                            />
                        </label>

                        <label htmlFor="">
                            <FontAwesomeIcon icon={faLock} />
                            <input type="password" placeholder="Nhập lại mật khẩu" 
                                value={customer.rePassword} 
                                onChange={(e) => setCustomer({...customer, rePassword: e.target.value})}
                            />
                        </label>

                        <label htmlFor="">
                            <FontAwesomeIcon icon={faPhone} />
                            <input type="phone" placeholder="Số điện thoại" 
                                value={customer.phone} 
                                onChange={(e) => setCustomer({...customer, phone: e.target.value})}
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
        </>
    );
}