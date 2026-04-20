import axios from "axios";
import { baseUrl } from "../base/api";

export const getHistory = async (token, params = {}, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/history/getAll`, {
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

export const getHistoryById = async (token, id, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/history/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const deleteHistory = async (token, id, signal) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/history/delete/${id}`,
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