import axios from "axios";
import { API_CONFIG } from "../config";

export async function getAllProducts() {
  try {
    const options = {
      url: `${API_CONFIG.baseURL}/products`,
      method: "GET",
    };
    const response = await axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getProductByid({ id }) {
  try {
    const options = {
      url: `${API_CONFIG.baseURL}/products/${id}`,
      method: "GET",
    };
    const response = await axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
