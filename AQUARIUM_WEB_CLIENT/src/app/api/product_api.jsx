/* eslint-disable no-unused-vars */
import axios from "axios";

export const getRandom_10_Product = async () => {
    try {
        const response = await axios.get(
            'http://localhost:8080/api/get_random_10_product',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return {
                product: response.data.product
            }
            
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get(
            'http://localhost:8080/api/get_products_client',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        if (response.status === 200) {
            return {
                data: response.data.data
            }
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer')
        if (jwt_token) {
            const response = await axios.get(
                'http://localhost:8080/api/get_product_by_id',
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

export const getProductsById = async (list_id) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token_customer')
        if (jwt_token) {
            const response = await axios.get(
                'http://localhost:8080/api/get_list_products_by_id',
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                    params: {list_id: encodeURIComponent(list_id)}
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