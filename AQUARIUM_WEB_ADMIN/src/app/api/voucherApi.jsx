import axios from "axios";

export const addVoucher = async (voucher) => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.post(
          "http://localhost:8080/api/add_voucher",
          voucher,
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

  export const getVouchers = async () => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.get(
          "http://localhost:8080/api/get_vouchers",
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
            return {
                data: response.data.data || []
            } 
        }
        
      }
    } catch (error) {
      console.error("Error fetching products: ", error?.response?.data?.message);
      throw error;
    }
  };

  
export const updateVouchers = async (vouchers) => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.post(
          "http://localhost:8080/api/update_voucher",
          vouchers,
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

  
export const deleteVouchers = async (vouchers) => {
    try {
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        const response = await axios.post(
          "http://localhost:8080/api/delete_voucher",
          vouchers,
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