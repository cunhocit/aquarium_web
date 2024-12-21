/* eslint-disable no-unused-vars */
import axios from "axios";
import { encryptAES, hashPassword } from "../security/CryptAES";

export const Register_API = async (customer) => {
    try {
        const formData = new FormData();
        formData.append('name', encryptAES(customer.name));
        formData.append('email', encryptAES(customer.email));
        formData.append('password', hashPassword(customer.password));
        formData.append('phone', encryptAES(customer.phone));

        const response = await axios.post(
            'http://localhost:8080/api/customer_register',
            formData,
            {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.status) {
            alert(response.data.message);
        } 

    }catch(error) {
        console.log(error?.response?.data?.message);
        alert(error?.response?.data?.message);
        throw error;
    }
}

export const Login_API = async (customer) => {
    try {
        const formData = new FormData();
        formData.append('email', encryptAES(customer.email));
        formData.append('password', hashPassword(customer.password));

        const response = await axios.post(
            'http://localhost:8080/api/customer_login',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.status) {
            const jwt_token = response.data.jwt_token; 
            const cus_id = response.data.cus_id;

            const tolenParts = jwt_token.split('.');
            const payload = JSON.parse(atob(tolenParts[1]));
            const exp = payload.exp;

            localStorage.setItem('jwt_token_customer', jwt_token);
            localStorage.setItem('cus_id', cus_id);
            localStorage.setItem('exp_customers', exp);
            localStorage.setItem('shopping_cart', JSON.stringify([]));
            return true;
        }

    }catch(error) {
        console.log(error?.response?.data?.message);
        alert(error?.response?.data?.message);
        throw error;
    }
}

export const PasswordReset_API = async (email) => {
    try {
        const response = await axios.post(
            'http://localhost:8080/api/customer_password_reset',
            {
                email: encryptAES(email)
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            alert(response.data.message)
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        alert(error?.response?.data?.message);
        throw error;
    }
}