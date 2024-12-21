import axios from "axios";

export const getVouchers = async () => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer')
        if (jwt_token) {
            const response = await axios.get(
                'http://localhost:8080/api/get_vouchers',
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
    
            if (response.status === 200) {
               return {
                    data: response.data.data || []
               }
            }
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}

export const claimVoucher = async (id_voucher, customer_id) => {
    try {
        const formData = new FormData();
        formData.append('voucher_id', id_voucher);
        formData.append('customer_id', customer_id);

        const jwt_token = localStorage.getItem('jwt_token_customer')
        if (jwt_token) {
            const response = await axios.post(
                'http://localhost:8080/api/claim_voucher',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );
    
            if (response.status === 200) {
                return response.data.message;
            }
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}