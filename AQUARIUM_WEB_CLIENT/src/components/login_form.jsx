/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons';

import { useReStateForm } from '../hooks/navigation_hook';

export default function LoginForm({isOpen, handleOpenForm, handleOpenRigister}) {
    const { username, password, reStateLoginForm, setPassword, setUsename }  = useReStateForm();

    const closeForm = () => {
        handleOpenForm();
        reStateLoginForm();
    }

    const openRegisterForm = () => {
        handleOpenRigister();
        handleOpenForm();
    }

    return (
        <div className="wrap-form-login" style={{top: isOpen ? "0" : "-100%"}}>
            <div className="login-box">
                <h1>Đăng nhập</h1>

                <div className="input-box">
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder="Tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsename(e.target.value)} />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" placeholder="Mật khẩu" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    <a href="#"><p>Quên mật khẩu?</p></a>
                </div>

                <button className='login-box-btn'>Đăng nhập</button>

                <div className="label-register">
                    <p>Chưa có tài khoản?</p>
                    <a href="#" onClick={openRegisterForm}>Đăng ký</a>
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