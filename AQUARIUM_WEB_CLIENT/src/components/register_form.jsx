/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faArrowLeft, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { useReStateForm } from '../hooks/navigation_hook';

// import { RegisterAccount } from '../api/auth/register';

export default function RegisterForm({isOpen, handleOpenForm, handleLoginForm}) {
    const { username, password, email, displayName, rePassword,
            setPassword, setUsename, setEmail, setDisplayName, setRePassword,
            reStateLoginForm,  }  = useReStateForm();
    
    const closeForm = () => {
        handleOpenForm()
        reStateLoginForm();
    }

    const openLoginForm = () => {
        handleOpenForm();
        handleLoginForm();
    }

    // const handleRegisterAccount = () => {
    //     RegisterAccount({ displayName, username, password, rePassword, email });
    // }

    return (
        <div className="wrap-form-register " style={{top: isOpen ? "0" : "-100%"}}>
            <div className="register-box">
                <h1>Đăng ký</h1>

                <div className="input-box-register">
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder="Tên người dùng"
                            id="display_name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder='Tên đăng nhập'
                            id='username'
                            value={username}
                            onChange={(e) => setUsename(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" placeholder="Mật khẩu" 
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" placeholder="Nhập lại mật khẩu" 
                            id='re_password'
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type="email" placeholder="Email"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                
                <div className='hr-box'>
                    <hr />
                    <FontAwesomeIcon icon={faHeart} />
                    <hr />
                </div>

                <button className='login-box-btn'>Đăng ký tài khoản</button>

                <div className="label-login">
                    <p>Đã có tài khoản!!...</p>
                    <a href="#" onClick={openLoginForm}>Đăng nhập</a>
                </div>

                <div className='bottom-box'>
                    <div className="turn-off-login-box" onClick={closeForm}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <p>Thoát</p>
                    </div>
                    <div className='box-icons'>
                        <FontAwesomeIcon className='fa-fb' icon={faFacebook} />
                        <FontAwesomeIcon className='fa-gg' icon={faGoogle} />
                        <FontAwesomeIcon className='fa-tt' icon={faTwitter} />
                    </div>
                </div>
            </div>
        </div>
    );
}