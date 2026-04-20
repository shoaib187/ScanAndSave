import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../configs/authContext/authContext';
import { scanBarcode, manualSearch } from '../../utils/scanner/api';

export const useScanBarcode = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (barcode) => scanBarcode(token, barcode),
    onError: (error) => {
      console.error('Scan Barcode Error:', error);
    },
  });
};

export const useManualSearch = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (query) => manualSearch(token, query),
    onError: (error) => {
      console.error('Manual Search Error:', error);
    },
  });
};