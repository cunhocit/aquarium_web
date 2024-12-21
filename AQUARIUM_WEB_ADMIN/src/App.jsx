/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/main.scss';
import Dashboard from './pages/dashboard';
import Customers from './pages/customer/customer';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgot_password';
import PrivateRoute from './components/PrivateRoute';
import { useTokenExpiration } from './hooks/useTokenExpiration';
import ProductsInfo from './pages/products/product_info';
import Products from './pages/products/products';
import AddProduct from './pages/products/add_product';
import Orders from './pages/orders/orders';
import OrderInfo from './pages/orders/orders_info';
import { CustomerInfo } from './pages/customer/customer_info';
import Settings from './pages/setttings/settings';
import ChangePassword from './pages/setttings/change_password';
import { Post } from './pages/post/post';
import ShowOrderHistory from './layouts/customers/order_history_tbl';
import { CustomerOrderHistory } from './pages/customer/customer_history';
import Sale from './pages/sale/sale';
import Voucher from './pages/voucher/voucher';

// localStorage.removeItem('jwt_token')
// localStorage.removeItem('id_admin')
// localStorage.removeItem('exp')

function App() {
  useTokenExpiration();
  return (
    <>
      <HelmetProvider>
        <Router>
          <Routes>
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />

            {/* Dashboard */}
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />

            {/* Products */}
            <Route path="/products" element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            } />
            <Route path="/add_product" element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            } />
            <Route path="/product_info/:id" element={
              <PrivateRoute>
                <ProductsInfo />
              </PrivateRoute>
            } />

            {/* Customers */}
            <Route path="/customer" element={
              <PrivateRoute>
                <Customers />
              </PrivateRoute>
            } />
            <Route path="/customer_info/:id" element={
              <PrivateRoute>
                <CustomerInfo />
              </PrivateRoute>
            } />
            <Route path="/order_history/:email" element={
              <PrivateRoute>
                <CustomerOrderHistory />
              </PrivateRoute>
            } />
            
            {/* Orders */}
            <Route path="/orders" element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            } />
            <Route path="/orders_info/:id" element={
              <PrivateRoute>
                <OrderInfo />
              </PrivateRoute>
            } />

            {/* Voucher */}
            <Route path="/voucher" element={
              <PrivateRoute>
                <Voucher />
              </PrivateRoute>
            } />

            {/* Settings */}
            <Route path="/settings" element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } />
            <Route path="/change_password" element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            } />

            {/* Posts */}
            <Route path="/post" element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            } />

            {/* Sale */}
            <Route path="/sale" element={
              <PrivateRoute>
                <Sale />
              </PrivateRoute>
            } />

          </Routes>
        </Router>
      </HelmetProvider>
    </>
  )
}

export default App
