import axios from "axios";
import { baseUrl } from "../base/api";

export const scanBarcode = async (token, barcode, signal) => {
  console.log('Scanning barcode:', barcode);
  try {
    const response = await axios.post(
      `${baseUrl}/api/scanner/scan`,
      { barcode },
      {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      }
    );
    console.log("Scanned response:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const manualSearch = async (token, query, signal) => {
  console.log("Manual Search:", query);
  try {
    const response = await axios.post(
      `${baseUrl}/api/scanner/manual-search`,
      { query },
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