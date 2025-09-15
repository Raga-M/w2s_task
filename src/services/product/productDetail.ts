import { AxiosInstance } from '../../lib/axiosInstance';

export const productDetailService = async (id: string) => {
  const res = await AxiosInstance.get(`/product/${id}`);
  return res?.data;
};
