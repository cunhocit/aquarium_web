import axios from "axios";
import { encryptAES } from "../security/CryptAES";

export const Payment_API = async (listProduct, transport, pay_method, totalPrice
    // voucher, 
    ) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer');
        const id = localStorage.getItem('cus_id');

        const data = {
            cus_id: encryptAES(id),
            listProduct: listProduct,
            transport: transport,
            pay_method: pay_method,
            price: totalPrice
        };

        if (jwt_token) {
            const response = await axios.post(
                'http://localhost:8080/api/payment',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
    
            if (response.status === 200) {
                alert(response.data.message);
                return true;
            }
        }
    }catch(error) {
        alert(error?.response?.data?.message);
        throw error;
    }
}