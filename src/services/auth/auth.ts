import { AxiosInstance } from '../../lib/axiosInstance';
import type { LoginData } from '../../types/common';

export const loginService = async (loginData: LoginData) => {
  const res = await AxiosInstance.post('/auth/login', loginData);
  console.log(res.data);
  return res?.data;
};
