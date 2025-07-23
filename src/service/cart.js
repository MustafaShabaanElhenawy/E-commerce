import axios from "axios";
import { API_CONFIG } from "../config";

export const addProductToCart = async (productId, token) => {
  const res = await axios.post(
    `${API_CONFIG.baseURL}/cart`,
    { productId },
    {
      headers: { token },
    }
  );
  return res.data;
};

export const getUserCart = async (token) => {
  const res = await axios.get(`${API_CONFIG.baseURL}/cart`, {
    headers: { token },
  });
  return res.data;
};

export const removeProductFromCart = async (productId, token) => {
  const res = await axios.delete(`${API_CONFIG.baseURL}/cart/${productId}`, {
    headers: { token },
  });
  return res.data;
};

export const updateProductQuantity = async (productId, count, token) => {
  const res = await axios.put(
    `${API_CONFIG.baseURL}/cart/${productId}`,
    { count },
    {
      headers: { token },
    }
  );
  return res.data;
};

export const clearUserCart = async (token) => {
  const res = await axios.delete(`${API_CONFIG.baseURL}/cart`, {
    headers: { token },
  });
  return res.data;
};
