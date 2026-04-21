import axios from "axios";
import { baseUrl } from "../base/api";

export const getFavorites = async (token, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/favorite/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const addFavorite = async (token, product_id, signal) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/favorite/add`,
      { product_id },
      {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const removeFavorite = async (token, id, signal) => {
  console.log(`Removing favorite with ID: ${id}`);
  try {
    const response = await axios.delete(
      `${baseUrl}/api/favorite/remove/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};