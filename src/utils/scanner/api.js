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

    // ← Add this — throws so useMutation's onError fires
    if (!response.data?.success) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : error;
  }
};
export const manualSearch = async (token, query, signal) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/scanner/manual-search`,
      { query },
      {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      }
    );

    if (!response.data?.success) {
      throw response.data;
    }

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) return;
    throw error.response ? error.response.data : error;
  }
};