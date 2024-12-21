import axios from 'axios';
import { validUpdatePrd } from "../valid/prodValid";

export const getAllCtgAPI = async () => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.get(
          "http://localhost:8080/api/get_all_ctg",
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching category: ", error);
      throw error;
    }
  };

  export const addCtgAPI = async (category) => {
    try {
      const data = [category];
      if(validUpdatePrd(data)) {
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
          const response = await axios.post("http://localhost:8080/api/add_category",
            { category },
            {
              headers: {
                Authorization: `Bearer ${jwt_token}`,
                "Content-Type": "application/json",
              }
          });
          alert(response.data.message);
    
          if (response.status) {
            return response.data.message;
          }
        }
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  export const deleteCategoriesAPI = async (categories) => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
          const response = await axios.post("http://localhost:8080/api/delete_category", 
            categories,
            {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          });
          alert(response.data.message);
    
          if (response.status) {
            return response.data.message;
          }
        }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };