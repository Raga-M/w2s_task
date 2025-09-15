import { BrowserRouter, Route, Routes } from 'react-router';
import { Toaster } from 'sonner';
import Modal from 'react-modal';
import AuthLayout from './layouts/AuthLayout';
import {
  Dashboard,
  Login,
  ProductBoard,
  ProductList,
  ProductDetail,
} from './pages';
import './App.css';
import NotFoundPage from './pages/404';

Modal.setAppElement('#root');
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product-boards" element={<ProductBoard />} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>

      <Toaster
        position="top-right"
        offset={22}
        toastOptions={{
          duration: 2000,
          className: 'toaster-title text-[14px]',
          classNames: {
            success:
              '!bg-green-500 !text-white border !border-green-700 !shadow-lg',
            error: '!bg-red-500 !text-white border !border-red-700 !shadow-md',
            info: 'bg-blue-500 !text-white border border-blue-700 !shadow-md',
            warning:
              '!bg-orange-500 !text-white border !border-yellow-700 !shadow-md',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
