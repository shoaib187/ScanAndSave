import axios from 'axios';
import { baseUrl } from '../base/api';


// 1. Register
export const register = async (full_name, email, password, terms_accepted, signal) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/auth/register`,
      { full_name, email, password, terms_accepted },
      { signal }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// 2. Login
export const login = async (email, password, signal) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/auth/login`,
      { email, password },
      { signal }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// 3. Logout
export const logout = async (token, signal) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/auth/logout`, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
      signal
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// 4. Google Callback
export const googleCallback = async (code, signal) => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/auth/google/callback`, {
      params: { code },
      signal
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// 5. Forgot Password
export const forgotPassword = async (email, signal) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/auth/forgot-password`,
      { email },
      { signal }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// 6. Reset Password
export const resetPassword = async (token, new_password, signal) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/auth/reset-password`,
      { token, new_password },
      { signal }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};