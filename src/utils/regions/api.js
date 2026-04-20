import axios from "axios";
import { baseUrl } from "../base/api";

export const getAllRegions = async (params = {}, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/region/getAll`, {
      params,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getRegionById = async (id, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/region/get/${id}`, {
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};