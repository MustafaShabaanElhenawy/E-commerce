import axios from "axios";
import { API_CONFIG } from "../config";




export const addProductToWishlist = async (productId, token) => {
  try {
    const response = await axios.post(
     ` ${API_CONFIG.baseURL}/wishlist`,
      { productId }, 
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
   
    throw error.response ? error.response.data : error.message;
  }
};


export const getUserWishlist = async (token) => {
  try {
    const response = await axios.get(`${API_CONFIG.baseURL}/wishlist`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const removeProductFromWishlist = async (productId, token) => {
  try {
    const response = await axios.delete(
      `${API_CONFIG.baseURL}/wishlist/${productId}`,
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};