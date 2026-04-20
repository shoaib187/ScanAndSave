
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../configs/authContext/authContext';
import { getNotifications, updateNotifications } from '../../utils/notifications/api';

export const useNotifications = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['notifications', token],
    queryFn: ({ signal }) => getNotifications(token, signal),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUpdateNotifications = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateNotifications(token, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', token] });
    },
    onError: (error) => {
      console.error('Update Notifications Error:', error);
    },
  });
};