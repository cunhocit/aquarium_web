
/* eslint-disable no-unused-vars */
import axios from "axios";

export const get3Posts = async () => {
    try {
        const response = await axios.get(
            'http://localhost:8080/api/client_get_3_posts',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return {
                posts: response.data.data
            }
            
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}

export const getPosts = async () => {
    try {
        const response = await axios.get(
            'http://localhost:8080/api/client_get_posts',
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return {
                posts: response.data.data
            }
            
        }
    }catch(error) {
        console.log(error?.response?.data?.message);
        throw error;
    }
}