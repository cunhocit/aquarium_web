import axios from "axios";
import { validRegister, validLogin, isValidEmail } from "../valid/audthValid";
import { encryptAES, hashPassword } from '../security/CryptAES';

export const RegisterAPI = async (name, email, password, re_password, phone) => {
    try {
        const data = [name, email, password, re_password, phone];
        if (validRegister(data)) {    
            const response = await axios.post(
              'http://localhost:8080/api/admin_register',
              {
                name: encryptAES(name),
                email: encryptAES(email),
                password: hashPassword(password),
                phone: encryptAES(phone)
              },
              {
                headers: {
                    'Content-Type': 'application/json'
                }
              }
            );

            if (response) {
              alert(response.data.message)
              window.location.href = '/login';
            }
        }
    }catch (error) {
        alert(error.response?.data?.message || 'Đăng ký thất bại');
    }   
}

export const LoginAPI = async (email, password) => {
  try {
      const data = [email, password];
      if (validLogin(data)) {
        const response = await axios.post(
          "http://localhost:8080/api/admin_login",
          {
            email: encryptAES(email),
            password: hashPassword(password)
          },
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );

        if (response.status === 200) {
          const token = response.data.jwt_token;
          const id = response.data.id_admin;

          const tokenParts = token.split('.');
          const payload = JSON.parse(atob(tokenParts[1]));
          const exp = payload.exp;

          localStorage.setItem('jwt_token', token);
          localStorage.setItem('id_admin', id);
          localStorage.setItem('exp', exp);

          alert(response.data.message);
          window.location.href = '/';
          
          return true;
        }
        if (response.status && response.status != 200) {
          alert(response.data.message);
        }
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Đăng nhập thất bại');
    return false;
  }
};

export const ForgotPasswordAPI = async (email) => {
  try {
    if (isValidEmail(email)) {
        const response = await axios.post(
          "http://localhost:8080/api/password_reset",
          {
            email: encryptAES(email)
          },
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        )

        console.log("response: ", response.data);
        
        if (response.status) {
          alert(response.data.message)
          window.location.href = '/login';
        }
    }else 
    alert ("Email không hợp lệ.")
  }catch(error) {
    alert(error.response?.data?.message || 'Gửi mật khẩu mới thất bại');
    throw error;
  }
}

export const LogoutAPI = async () => {
  try {
    const jwt_token = localStorage.getItem('jwt_token');
    if (jwt_token) {
      const response = await axios.get(
        'http://localhost:8080/api/log_out_admin',
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status) {
        return {
          message: response.data.message
        }
      }
    }
  }catch(error) {
    console.log("Lỗi: ", error);  
    throw error;
  }
}