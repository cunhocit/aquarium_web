/* eslint-disable no-unused-vars */
import axios from "axios";
import { OrderValid } from "../valid/ordersValid";

export const getOrdersAPI = async () => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        
        if (jwt_token) {
            const response = await axios.get(`http://localhost:8080/api/get_orders`, {
                headers: {
                    'Authorization': `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                return {
                    data: response.data.data || []
                };
            }
        }

        return {
            data: []
        };
    }catch (error) {
        console.error('Lỗi: ', error);
        throw error;
    }
}

export const updateOrderAPI = async (order) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        if (jwt_token) {
            const response = await axios.post(
                `http://localhost:8080/api/update_order`,
                order,
            {
                headers: {
                    'Authorization': `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200) {
                alert(response.data.message);
                return true;
            }
        }

    }catch (error) {
        alert(error.response.data.message)
        throw error;
    }
}


export const getOrdersByPrdName = async (name) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        if (jwt_token && name) {
            const response = await axios.get(
                `http://localhost:8080/api/get_order_by_prd_name`,
            {
                params: { name }, 
                headers: {
                    'Authorization': `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                return {
                    data: response.data.data || []
                }
            }
        }
    }catch (error) {
        console.error('Lỗi: ', error);
        throw error;
    }
}

export const getOrdersById = async (id) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        if (jwt_token && id) {
            const response = await axios.get(
                `http://localhost:8080/api/get_order_by_id`,
            {
                params: { id }, 
                headers: {
                    'Authorization': `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status) {
                return response.data.data
            }
        }
    }catch (error) {
        console.error('Lỗi: ', error);
        throw error;
    }
}


