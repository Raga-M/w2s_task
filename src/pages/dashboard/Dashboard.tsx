
import { userAuthStore } from '../../store/auth/authStore';
import { Apple, CalendarArrowDown, Truck } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard';

const Dashboard = () => {
  const user = userAuthStore((state) => state.user);
  return (
    <div className='m-5'>
      <h2 className="text-2xl font-semibold ">Dashboard</h2>
      <p>
        Welcome back {user?.firstName} {user?.lastName}
      </p>
      <div className='flex gap-8 my-4'>
        <StatsCard  icon={<Apple size={40}/>} title='Product' count={2500} />
        <StatsCard  icon={<CalendarArrowDown size={40} />} title='Order' count={4000} bgColor='!bg-orange-200' />
        <StatsCard  icon={<Truck size={40}  />} title='Delivery Partner' count={1000} bgColor='!bg-purple-200' />
      </div>
    </div>
  );
};
export default Dashboard;
