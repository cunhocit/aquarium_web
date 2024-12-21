import axios from "axios";


export const getOrderById = async () => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer')
        const id = localStorage.getItem('cus_id');
        if (jwt_token) {
            const response = await axios.get(
                'http://localhost:8080/api/customer_get_order_by_id',
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
                    data: response.data.data
               }
            }
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}

export const DestroyOrderAPI = async (id) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer')
        if (jwt_token && id) {
            const response = await axios.post(
                'http://localhost:8080/api/destroy_order',
                {id},
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
    
            if (response.status === 200) {
               console.log(response.data.message);
               return response.data.message;
            }
        }
    }catch(error) {
        console.log("Lỗi: ", error.response.data.message);
        throw error;
    }
}