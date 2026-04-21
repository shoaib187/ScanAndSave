import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile } from '../../utils/profile/api';
import { useAuth } from '../../configs/authContext/authContext';

export const useProfile = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['userProfile', token],
    queryFn: ({ signal }) => getProfile(token, signal),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};


export const useUpdateProfile = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateProfile(token, data),
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: ['userProfile', token] });
      }
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    }
  });
};