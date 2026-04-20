import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../configs/authContext/authContext';
import { getPreferences, updatePreferences } from '../../utils/preferences/api'; // Adjust path

export const usePreferences = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['userPreferences', token],
    queryFn: ({ signal }) => getPreferences(token, signal),
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });
};

export const useUpdatePreferences = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updatePreferences(token, data),
    onSuccess: (response) => {
      if (response?.success || response) {
        queryClient.invalidateQueries({ queryKey: ['userPreferences', token] });
      }
    },
    onError: (error) => {
      console.error("Update Preferences Error:", error);
    },
  });
};