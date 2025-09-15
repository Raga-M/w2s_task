import { useInfiniteQuery } from "@tanstack/react-query";
import getAllProductService from "../services/product/getAllProducts";
import { PAGE_SIZE } from "../constants";

export const useProductList =(search:string)=>{
    return useInfiniteQuery({
  queryKey: ['productList', search],
  queryFn: getAllProductService,
  getNextPageParam: (lastPage, allPages) => {
    const nextSkip = allPages.length * PAGE_SIZE;
    return nextSkip < lastPage.total ? nextSkip : undefined;
  },
  initialPageParam: 0,
});
}