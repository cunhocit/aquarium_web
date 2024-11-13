/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faTwitter} from '@fortawesome/free-brands-svg-icons';

export default function Login(
    {openRegister, isOpenForm}
) {
    return(
        <>
        <div className="wrap-form-login" style={{
            display: !isOpenForm ? 'block' : 'none' 
        }
            }>
            <div className="login-box">
                <h1>Đăng nhập
                    <FontAwesomeIcon icon={faCoffee} />
                </h1>

                <div className="input-box">
                    <label htmlFor="">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="email" placeholder="Email" />
                    </label>

                    <label htmlFor="">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" placeholder="Mật khẩu" />
                    </label>

                    <a href="#"><p>Quên mật khẩu?</p></a>
                </div>

                <button className='login-box-btn'>Đăng nhập</button>

                <div className="label-register">
                    <p>Chưa có tài khoản?</p>
                    <a href="#"
                        onClick={openRegister}
                    >Đăng ký</a>
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
        </>
    )
}