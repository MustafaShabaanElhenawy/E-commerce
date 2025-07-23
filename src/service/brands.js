import axios from "axios";
import { API_CONFIG } from "../config";

export async function getAllBrands() {
  try {
    const options = {
      url: `${API_CONFIG.baseURL}/brands`,
      method: "GET",
    };
    const response = await axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
