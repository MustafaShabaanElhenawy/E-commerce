import axios from "axios";
import { API_CONFIG } from "../config";

export async function getAllCatrgories() {
  try {
    const options = {
      url: `${API_CONFIG.baseURL}/categories`,
      method: "GET",
    };
    const response = await axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
