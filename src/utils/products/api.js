import axios from "axios";
import { baseUrl } from "../base/api";

export const getAllProducts = async (token, params = {}, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getProductById = async (token, id, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getProductPrices = async (token, id, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/prices/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};