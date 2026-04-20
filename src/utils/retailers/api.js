import axios from "axios";
import { baseUrl } from "../base/api";

export const getAllRetailers = async (signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/retailer/getAll`, {
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getRetailerById = async (id, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/retailer/get/${id}`, {
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};