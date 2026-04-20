import { useQuery } from '@tanstack/react-query';
import { getAllRegions, getRegionById } from '../../utils/regions/api';

export const useRegions = (params = {}) => {
  return useQuery({
    queryKey: ['regions', params],
    queryFn: ({ signal }) => getAllRegions(params, signal),
    staleTime: 1000 * 60 * 30, // 30 minutes — regions rarely change
  });
};

export const useRegionById = (id) => {
  return useQuery({
    queryKey: ['region', id],
    queryFn: ({ signal }) => getRegionById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });
};