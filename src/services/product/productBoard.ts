import { AxiosInstance } from '../../lib/axiosInstance';

export const ProductBoardService = async () => {
  const res = await AxiosInstance.get('/todo');
  return res?.data;
};
