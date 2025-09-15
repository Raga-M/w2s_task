import { useQuery } from '@tanstack/react-query';
import { ProductBoardService } from '../services/product/productBoard';

export const useTodo = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: ProductBoardService,
  });
};
