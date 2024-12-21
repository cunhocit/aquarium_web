import axios from "axios";

export const getDataDashboard = async () => {
    try {
        const jwt_token = localStorage.getItem('jwt_token');

        if (jwt_token) {
            const response = await axios.get(
                'http://localhost:8080/api/get_data_dashboard',
                {
                    headers: {
                        'Authorization' : `Bearer ${jwt_token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 200) {
                return {
                    data: response.data.data || []
                };
            }
            if (response.status && response.status != 200) {
                console.log(response.data.message);
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

export const getAllPrdAndCateAPI = async () => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.get(
          'http://localhost:8080/api/get_products',
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        if (response.status) {
            return {
                data: response.data.data || []
            };
        }
      }

      return {
          data: []
      };

    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
    }
  };

  export const getProducts = async () => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.get(
          'http://localhost:8080/api/get_products',
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        if (response.status) {
            return {
                data: response.data.data || []
            };
        }
      }

      return {
          data: []
      };

    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
    }
  };