import { useQuery } from '@tanstack/react-query';
import { productDetailService } from '../services/product/productDetail';

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productDetailService(id),
  });
};
