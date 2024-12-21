import axios from "axios";
import { validUpdatePrd } from "../valid/prodValid";

export const getAllPrdAPI = async () => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.get(
          "http://localhost:8080/api/get_all_prd",
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
      console.error("Error fetching products: ", error);
      throw error;
    }
  };

  export const deletePrdAPI = async (name) => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.post(
          "http://localhost:8080/api/delete_product",
          name,
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error delete products: ", error);
      throw error;
    }
  };

  export const updatePrdAPI = async (product) => {
    try {
      if(validUpdatePrd(product)) {
        console.log(product);
        
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
          const response = await axios.post("http://localhost:8080/api/update_prd", 
            product,
            {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          });
    
          if (response.status === 200) {
            alert(response.data.message)
          }
          
          console.log("Update Response:", response.data);
        }
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  export const addPrdAPI = async (newPrd) => {
    try {
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
          const response = await axios.post("http://localhost:8080/api/add_product", 
            newPrd,
            {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": 'multipart/form-data',
            },
          });
    
          if (response.status == 200) {
            alert(response.data.message)
            return response.data.message;
          }
        }
    } catch (error) {
      alert(error);
    }
  };
  
export const updatePrdImageAPI = async (prd) => {
  try {
      const jwt_token = localStorage.getItem('jwt_token');

      if (jwt_token && prd) {
          const response = await axios.post(
              'http://localhost:8080/api/update_prd_image',
              prd,
              {
                  headers: {
                      'Authorization': `Bearer ${jwt_token}`,
                      'Content-Type': 'multipart/form-data'
                  },
              }
          );

          if (response.status === 200) {
              alert(response.data.message);
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

export const getProductById = async (id) => {
  try {
    const jwt_token = localStorage.getItem('jwt_token');

      if (jwt_token && id) {
          const response = await axios.get(
              'http://localhost:8080/api/get_product_by_id',
              {
                  headers: {
                      'Authorization': `Bearer ${jwt_token}`,
                      'Content-Type': 'multipart/form-data'
                  },
                  params: {id},
              }
          );

          if (response.status === 200) {
              return {data: response.data.data}
          }
      }
  }catch(error) {
      console.error('Lỗi: ', error);
      throw error;
  }
}

export const updateProductSale = async (chooseSales) => {
  try {
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
      const response = await axios.post(
        "http://localhost:8080/api/update_product_sale",
        chooseSales,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

export const deleteProductSale = async (chooseSales) => {
  try {
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
      const response = await axios.post(
        "http://localhost:8080/api/delete_product_sale",
        chooseSales,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};