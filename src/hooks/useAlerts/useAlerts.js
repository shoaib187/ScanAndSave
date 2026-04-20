import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../configs/authContext/authContext';
import {
  getAllPriceAlerts,
  getPriceAlertById,
  createPriceAlert,
  updatePriceAlert,
  deletePriceAlert
} from "../../utils/alerts/api"

// --- Queries ---

export const usePriceAlerts = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['priceAlerts', token],
    queryFn: ({ signal }) => getAllPriceAlerts(token, signal),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePriceAlert = (id) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['priceAlert', id, token],
    queryFn: ({ signal }) => getPriceAlertById(token, id, signal),
    enabled: !!token && !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// --- Mutations ---

export const useCreatePriceAlert = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createPriceAlert(token, data),
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries({ queryKey: ['priceAlerts', token] });
      }
    },
  });
};

export const useUpdatePriceAlert = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    // Usage: mutate({ id, data })
    mutationFn: ({ id, data }) => updatePriceAlert(token, id, data),
    onSuccess: (response, variables) => {
      if (response) {
        queryClient.invalidateQueries({ queryKey: ['priceAlerts', token] });
        queryClient.invalidateQueries({ queryKey: ['priceAlert', variables.id, token] });
      }
    },
  });
};

export const useDeletePriceAlert = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePriceAlert(token, id),
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries({ queryKey: ['priceAlerts', token] });
      }
    },
  });
};