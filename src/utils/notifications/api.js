import axios from "axios";
import { baseUrl } from '../base/api';

export const getNotifications = async (token, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/notifications/get`, {
      headers: { Authorization: `Bearer ${token}` },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const updateNotifications = async (token, data, signal) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/user/notifications/update`,
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