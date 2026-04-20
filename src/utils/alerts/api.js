import axios from "axios";
import { baseUrl } from "../base/api";

export const createPriceAlert = async (token, data, signal) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/price-alert/create`,
      data,
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

export const getAllPriceAlerts = async (token, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/price-alert/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getPriceAlertById = async (token, id, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/price-alert/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const updatePriceAlert = async (token, id, data, signal) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/price-alert/update/${id}`,
      data,
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

export const deletePriceAlert = async (token, id, signal) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/price-alert/delete/${id}`,
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