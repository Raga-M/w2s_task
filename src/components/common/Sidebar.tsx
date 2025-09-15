import { useState } from 'react';

import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  LayoutGrid,
  Package,
} from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '../../utils';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const menuItems = [
    {
      label: 'Product Boards',
      path: '/product-boards',
      icon: <LayoutGrid />,
    },
    {
      label: 'Product List',
      path: '/products',
      icon: <Package />,
    },
  ];

  return (
    <div className="flex relative">
      <div
        className={`h-screen bg-white text-[#62636C] border-r border-[#F3F5F7]  shadow-lg transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-5 py-6 flex items-center justify-center border-b ">
            {!isCollapsed ? (
              <h1 className="text-xl font-bold text-primary">Way2Smile</h1>
            ) : (
              <h1 className=" font-bold text-primary">W2S</h1>
            )}
          </div>

          <div className="flex-grow overflow-y-auto mt-6">
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);

              return (
                <Link key={item.label} to={item.path}>
                  <div
                    className={cn(
                      `flex items-center gap-3 py-3 px-4 cursor-pointer hover:bg-[#EEEAFF]  hover:text-primary mt-2 ${
                        isActive ? 'bg-primary/20 text-primary' : ''
                      } ${isCollapsed ? 'justify-center' : ''}`
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="text-sm">{item.label}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <button
        className={cn(
          `absolute py-2 rounded-full transition-all duration-200  border px-2 bg-white shadow-2xl cursor-pointer text-gray-400 ${
            isCollapsed ? 'left-[60px] top-5' : 'left-[235px] top-5'
          }`
        )}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ArrowRightFromLine size={20} />
        ) : (
          <ArrowLeftToLine size={20} />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
