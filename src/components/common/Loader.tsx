
import { Loader as LoaderIcon } from "lucide-react";

const Loader: React.FC = () => {
  return (
    <div className="">
      <div className="inset-0 h-full flex items-center justify-center bg-black/20 z-[999] fixed backdrop-blur-sm ">
      <div className="animate-spin">
        <LoaderIcon  size={50} className="text-primary"/>       
      </div>

      </div>
     
    </div>
  );
};

export default Loader;
