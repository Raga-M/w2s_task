import { PAGE_SIZE } from "../../constants";
import { AxiosInstance } from "../../lib/axiosInstance";
import type { QueryFunctionContext } from "@tanstack/react-query";

const getAllProductService = async ({ 
  pageParam = 0, 
  queryKey 
}: QueryFunctionContext<string[], number>) => {
  const search = queryKey[1] || "";
  const url = search
    ? `/products/search?q=${search}&limit=${PAGE_SIZE}&skip=${pageParam}`
    : `/products?limit=${PAGE_SIZE}&skip=${pageParam}`;
  const res = await AxiosInstance.get(url);
  return res.data;
};

export default getAllProductService;
