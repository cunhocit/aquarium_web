// api cho admin

import axios from "axios";

export const getAdminAPI = async (id) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        
        if (jwt_token && id) {
            const response = await axios.get(
                'http://localhost:8080/api/get_admin',
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                    params: {id}
                }
            );

            if (response.status === 200) {
                return {
                    data: response.data.admin
                };
            }
            if (response.status && response.status != 200) {
                console.log(response.status.message);
            }
        }
    }catch(error) {
        console.error('Lỗi: ', error);
        throw error;
    }
}

export const updateAdmin = async (admin) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        
        if (jwt_token && admin) {
            const response = await axios.post(
                'http://localhost:8080/api/update_admin',
                admin,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            if (response.status === 200) {
                alert(response.data.message);
            }
        }
    }catch(error) {
        console.error('Lỗi: ', error);
        throw error;
    }
}


export const updateAvatar = async (admin) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        const form_data = new FormData();
        form_data.append("id", admin.id);
        form_data.append("file", admin.file);
        form_data.append("time", (new Date()).getTime());

        if (jwt_token && admin) {
            const response = await axios.post(
                'http://localhost:8080/api/update_image_admin',
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


export const ChangePasswordAPI = async (passBox) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        if (jwt_token && passBox){
            const response = await axios.post(
                'http://localhost:8080/api/change_password_admin',
                passBox,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status === 200) {
                alert(response.data.message);
            }
        }
    }catch(error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

export const getHeader = async (id) => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');
        
        if (jwt_token && id) {
            const response = await axios.get(
                'http://localhost:8080/api/get_header_admin',
                {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    },
                    params: {id}
                }
            );

            if (response.status === 200) {
                return {
                    data: response.data.data
                };
            }
            if (response.status && response.status != 200) {
                console.log(response.status.message);
            }
        }
    }catch(error) {
        console.error('Lỗi: ', error);
        throw error;
    }
}