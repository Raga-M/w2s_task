import { useQuery } from '@tanstack/react-query';
import { ProfileService } from '../services/profile/profile';

export const useProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: ProfileService,
  });
};
