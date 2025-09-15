import { Skeleton } from "antd";

const TableShimmer = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-4 items-center p-2">
 
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton.Input 
            key={index} 
            active 
            size="small" 
          className="w-full"
          />
        ))}

  
        <Skeleton.Button active size="small" className="w-14" />
      </div>
    </div>
  );
};

export default TableShimmer;
