import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Eye, IndianRupee, Search } from 'lucide-react';
import { Button } from 'antd';
import { useProductList } from '../../hooks/useProductList';
import TableShimmer from '../../components/common/Shimmer/TableShimmer';
const ProductList = () => {
  const [search, setSearch] = useState('');
  const parentRef = useRef<HTMLDivElement>(null);

 const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch,
  isLoading,
  error,
} = useProductList(search)
  const products = data?.pages.flatMap((page) => page.products) || [];

  const rowVirtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
    overscan: 5,
  });
  const getItems = rowVirtualizer.getVirtualItems();
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (virtualItems.length === 0) return;

    const lastItem = virtualItems[virtualItems.length - 1];
    if (
      !isFetchingNextPage &&
      hasNextPage &&
      lastItem?.index >= products.length - 1
    ) {
      fetchNextPage();
    }
  }, [
    rowVirtualizer,
    getItems,
    isFetchingNextPage,
    hasNextPage,
    products.length,
    fetchNextPage,
  ]);

 

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, refetch]);

  
  if (error)
    return <div className="p-6 text-red-500">Error loading products</div>;

  return (
    <div className="m-5">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
     <div className='relative'> <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 border-gray-400  p-2 rounded w-1/3 mb-4 focus:border-gray-600 ps-8"
      />
      <Search className='text-gray-400 absolute top-2.5 left-1.5 '/>
      </div>

      <div className="grid grid-cols-7 gap-2 p-4 font-bold bg-gray-100 border-b border-gray-300 text-gray-800">
        <span>Title</span>
        <span>Category</span>
        <span>Price</span>
        <span>Rating</span>
        <span>Tags</span>
        <span>Updated At</span>
        <span>Actions</span>
      </div>
   {isLoading && search && (
  <>
    {Array.from({ length: 6 }).map((_, i) => (
      <TableShimmer key={i} />
    ))}
  </>
)}

      <div ref={parentRef} className="overflow-auto h-[400px]">
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems()?.map((virtualRow) => {
            const product = products[virtualRow.index];
            if (!product) return null;
            return (
              <div
                key={product.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="grid grid-cols-7 items-center gap-2 p-4 border-b  border-gray-300 hover:bg-gray-50"
              >
                <span className=" truncate">{product?.title}</span>
                <span className=" truncate">{product?.category}</span>
                <span className=" truncate flex items-center"> <IndianRupee size={15} />{product?.price}</span>
                <span className=" truncate">{product?.rating?.toFixed(1)}</span>
                <span className=" truncate">{product?.tags?.join(', ')}</span>
                <span className=" truncate">
                  {new Date(product?.meta?.updatedAt)?.toDateString()}
                </span>
                <div className="flex gap-2">
                  <Link to={`/products/${product.id}`} viewTransition>
                    <Button
                      color="orange"
                      variant="outlined"
                      icon={<Eye style={{paddingTop:"3px"}} size={20} />}
                      className="font-medium !flex !items-center"
                    >
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
          {rowVirtualizer.getVirtualItems().length == 0 && !isLoading &&(
            <p className="text-center text-gray-500 py-3">No Product found!</p>
          )}
          {isFetchingNextPage && (
            <div className=" text-gray-500 ">Loading more...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
