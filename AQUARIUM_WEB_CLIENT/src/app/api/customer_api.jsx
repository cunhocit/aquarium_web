import axios from "axios";
import { encryptAES, hashPassword } from "../security/CryptAES";


export const getCustomerById = async () => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer')
        const id = localStorage.getItem('cus_id');
        if (jwt_token) {
            const response = await axios.get(
                'http://localhost:8080/api/get_customer_by_id',
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                    params: {id: id}
                }
            );
    
            if (response.status === 200) {
                return {
                    customer: response.data.data
                }
                
            }
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}


export const updateCustomer = async (customer) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer')
        if (jwt_token) {
            const response = await axios.post(
                'http://localhost:8080/api/update_customer',
                customer,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
    
            if (response.status === 200) {
               alert(response.data.message)
            }
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}


export const changePassword = async (passBox) => {
    try {
        const newPassBox = new FormData();
        newPassBox.append('password', hashPassword(passBox.password));
        newPassBox.append('new_password', hashPassword(passBox.new_password));
        newPassBox.append('id', encryptAES(localStorage.getItem('cus_id')));

        const jwt_token = localStorage.getItem('jwt_token_customer')
        if (jwt_token) {
            const response = await axios.post(
                'http://localhost:8080/api/change_password_customer',
                newPassBox,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );
    
            if (response.status === 200) {
               alert(response.data.message)
            }
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}

export const updateAvatar = async (customer) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer');
        const form_data = new FormData();
        form_data.append("id", customer.id);
        form_data.append("file", customer.file);
        form_data.append("time", (new Date()).getTime());

        if (jwt_token && customer) {
            const response = await axios.post(
                'http://localhost:8080/api/update_image_customer',
                form_data,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            if (response.status === 200) {
                return {
                    message: response.data.message
                };
            }
        }
    }catch(error) {
        console.error('Lỗi: ', error);
        throw error;
    }
}


// export const getInfoNavigation = async () => {
//     try {
//         const jwt_token = localStorage.getItem('jwt_token_customer');
//         const id = localStorage.getItem('cus_id');
//         if (jwt_token && id) {
//             const response = await axios.get(
//                 'http://localhost:8080/api/get_navigation',
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${jwt_token}`,
//                         'Content-Type': 'application/json'
//                     },
//                     params: {id: id}
//                 }
//             );

//             if (response.status === 200) {
//                 return {
//                     data: response.data.data
//                 };
//             }
//         }
//     }catch(error) {
//         console.error('Lỗi: ', error);
//         throw error;
//     }
// }