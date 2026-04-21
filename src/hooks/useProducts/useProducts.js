import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../configs/authContext/authContext';
import { getAllProducts, getProductById, getProductPrices } from '../../utils/products/api';

export const useProducts = (params = {}) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['products', token, params],
    queryFn: ({ signal }) => getAllProducts(token, params, signal),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProductById = (id) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['product', token, id],
    queryFn: ({ signal }) => getProductById(token, id, signal),
    enabled: !!token && !!id,
    staleTime: 1000 * 60 * 5,
  });
};
export const useProductPrices = (id) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['productPrices', token, id],
    queryFn: ({ signal }) => getProductPrices(token, id, signal),
    enabled: !!token && !!id,
    staleTime: 0,
    refetchInterval: (query) => {
      const status = query.state.data?.prices_status;
      if (status === 'ready') return false;
      return 6000;
    },
    refetchIntervalInBackground: false,
  });
};