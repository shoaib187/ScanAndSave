import { useQuery } from '@tanstack/react-query';
import { getAllRetailers, getRetailerById } from '../../utils/retailers/api';

export const useRetailers = () => {
  return useQuery({
    queryKey: ['retailers'],
    queryFn: ({ signal }) => getAllRetailers(signal),
    staleTime: 1000 * 60 * 30, // 30 minutes — retailers rarely change
  });
};

export const useRetailerById = (id) => {
  return useQuery({
    queryKey: ['retailer', id],
    queryFn: ({ signal }) => getRetailerById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });
};