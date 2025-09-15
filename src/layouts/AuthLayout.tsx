import { Outlet, useNavigate } from 'react-router';
import { Header, Sidebar } from '../components/common';
import { useEffect } from 'react';
const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      navigate('/login');
    }
    return;
  }, []);
  return (
    <div className="bg-white">
      <div className="flex">
        <Sidebar />
        <div className="w-full -mt-1">
          <Header />
          <div className="h-[86vh] overflow-y-hidden mx-6 mb-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
