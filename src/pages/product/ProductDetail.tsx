import { useNavigate, useParams } from 'react-router';
import { useProductDetails } from '../../hooks/useProductDetail';
import ProductList from './ProductList';
import { IndianRupee, Star, X } from 'lucide-react';
import ProductDetailShimmer from '../../components/common/Shimmer/ProductShimmer';

const ProductListPage = () => {
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isLoading, isError } = useProductDetails(productId);
  console.log(product);
  const navigate = useNavigate();
if(isError) return <p className='text-danger p-2'>Error product details</p>
  return (
    <div className="p-6 flex gap-4">
      <ProductList />

      {isLoading ? (
       
        <ProductDetailShimmer/>
        
      ) : (
        product &&
        productId && (
          <div className="w-1/3 p-4  bg-white-50 relative shadow">
            <button
              onClick={() => navigate('/products')}
              className="absolute top-2 right-2 px-2 py-1 size-10 place-self-center bg-red-100 rounded-full cursor-pointer hover:bg-red-200 "
            >
              <X className="text-red-400" />
            </button>
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="size-52 object-cover mb-4 rounded mx-auto"
            />
            <h2 className="text-lg font-bold">
              {product?.title}
              {product?.brand && (
                <span className="text-gray-600 capitalize ps-2">
                  ({product?.brand})
                </span>
              )}
            </h2>
            <p className="text-gray-500 capitalize">{product?.category}</p>
            <p className="text-xl font-semibold mt-2 flex items-center">
               <IndianRupee size={18} />{product?.price}
              {product?.discountPercentage && (
                <span className="text-green-500 ml-2">
                  ({product?.discountPercentage}%) Off
                </span>
              )}
            </p>
            <p className="mt-2 flex items-center gap-1">
              Rating:
              <Star className=" fill-yellow-300 stroke-yellow-300" size={20} />
              {product?.rating?.toFixed(1)}
            </p>
            <p className="py-2">
              Stock: {product?.stock}{' '}
              {product?.stock > 0 ? (
                <span className="bg-green-400 px-2 py-1 text-xs rounded-full text-white">
                  Available
                </span>
              ) : (
                <span className="bg-red-400 px-2 py-1 text-xs rounded-full text-white">
                  Out of stock
                </span>
              )}{' '}
            </p>
            <h5 className="font-semibold mt-4">Description:</h5>
            <p className="">{product?.description}</p>
          </div>
        )
      )}
    </div>
  );
};

export default ProductListPage;
