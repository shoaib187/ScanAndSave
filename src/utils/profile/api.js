import axios from 'axios';
import { baseUrl } from '../base/api';

export const getProfile = async (token, signal) => {
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


import RNBlobUtil from 'react-native-blob-util';

export const updateProfile = async (token, { full_name, avatar }) => {
  // console.log("Updating profile with data:", { full_name, avatar });
  try {
    const data = [];

    if (full_name) {
      data.push({
        name: 'full_name',
        data: full_name,
      });
    }

    if (avatar) {
      // Strip file:// prefix — RNBlobUtil.wrap needs the raw path
      const cleanUri = avatar.uri.replace('file://', '');
      data.push({
        name: 'avatar',
        filename: avatar.name || 'avatar.jpg',
        type: avatar.type || 'image/jpeg',
        data: RNBlobUtil.wrap(cleanUri),
      });
    }

    const response = await RNBlobUtil.fetch(
      'PUT', // ← was POST, API requires PUT
      `${baseUrl}/api/user/profile/edit`,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data
    );

    const status = response.info().status;
    const raw = response.data;

    let resData = {};
    try {
      resData = raw ? JSON.parse(raw) : {};
    } catch {
      resData = { success: status === 200 };
    }

    if (status !== 200) {
      throw new Error(resData?.message || 'Upload failed');
    }

    return resData;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};