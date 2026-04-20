import axios from 'axios';
import { baseUrl } from '../base/api';

// Get logged-in user's profile
export const getProfile = async (token, signal) => {
  console.log("Fetching profile with token:s", token);
  try {
    const response = await axios.get(`${baseUrl}/api/user/profile/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Update profile (Name and/or Avatar)
export const updateProfile = async (token, { full_name, avatar }, signal) => {
  try {
    const formData = new FormData();

    if (full_name) {
      formData.append('full_name', full_name);
    }
    if (avatar) {
      formData.append('avatar', avatar);
    }
    const response = await axios.put(`${baseUrl}/api/user/profile/edit`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      signal,
      transformRequest: (data) => data,
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};