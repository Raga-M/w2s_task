import { AxiosInstance } from '../../lib/axiosInstance';

export const ProfileService = async () => {
  const res = await AxiosInstance.get('/auth/me');
  return res?.data;
};
