import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../configs/authContext/authContext';
import { getFavorites, addFavorite, removeFavorite } from '../../utils/favorites/api';

export const useFavorites = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['favorites', token],
    queryFn: ({ signal }) => getFavorites(token, signal),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAddFavorite = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product_id) => addFavorite(token, product_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', token] });
    },
    onError: (error) => {
      console.error('Add Favorite Error:', error);
    },
  });
};

export const useRemoveFavorite = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => removeFavorite(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', token] });
    },
    onError: (error) => {
      console.error('Remove Favorite Error:', error);
    },
  });
};