/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faHeart, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Register(
    // {openLogin, isOpenForm}
) {
    return (
        <div className="wrap-form-register " style={{
                // display: isOpenForm ? 'block' : 'none'
            }}>
            <div className="register-box">
                <h1>Đăng ký
                    <FontAwesomeIcon icon={faCoffee} />
                </h1>

                <div className="input-box-register">
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder="Tên người dùng" />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder='Tên đăng nhập' />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" placeholder="Mật khẩu" />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" placeholder="Nhập lại mật khẩu" />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type="email" placeholder="Email" />
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
                    <a href="#" 
                        // onClick={openLogin}
                    >Đăng nhập</a>
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
    );
}