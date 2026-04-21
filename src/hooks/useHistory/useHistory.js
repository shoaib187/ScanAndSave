import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../configs/authContext/authContext';
import { getHistory, getHistoryById, deleteHistory } from '../../utils/history/api';

export const useHistory = (params = {}) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['history', token, params],
    queryFn: ({ signal }) => getHistory(token, params, signal),
    enabled: !!token,
    staleTime: 1000 * 60 * 2, // 2 minutes — history updates frequently
  });
};

export const useHistoryById = (id) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['history', token, id],
    queryFn: ({ signal }) => getHistoryById(token, id, signal),
    enabled: !!token && !!id,
    staleTime: 1000 * 60 * 2,
  });
};
export const useDeleteHistory = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteHistory(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['history', token],
        exact: false, // ← invalidates ALL keys starting with ['history', token]
      });
    },
    onError: (error) => {
      console.error('Delete History Error:', error);
    },
  });
};