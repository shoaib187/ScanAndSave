import axios from "axios";
import { baseUrl } from "../base/api";

// Get user preferences
export const getPreferences = async (token, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/preferences/get`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Update user preferences
export const updatePreferences = async (token, data, signal) => {
  console.log("data", data);
  try {
    const response = await axios.put(
      `${baseUrl}/api/user/preferences/update`,
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