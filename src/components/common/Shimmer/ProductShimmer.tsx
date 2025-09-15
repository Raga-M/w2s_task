import { Skeleton } from "antd";

const ProductDetailShimmer = () => {
  return (
    <div className="w-1/3 p-4 bg-white shadow rounded relative">
      <div className="flex justify-center mb-4">
        <Skeleton.Image
          active
          style={{ width: 200, height: 200, borderRadius: 8 }}
        />
      </div>
<Skeleton.Input active  className="w-full mb-5"/>
<Skeleton.Input active  className="w-full mb-5"/>
<Skeleton.Input active  className="w-full mb-5"/>
 <Skeleton paragraph={{ rows: 3 }} active />
    </div>
  );
};

export default ProductDetailShimmer;
