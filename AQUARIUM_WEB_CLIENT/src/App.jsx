/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { useTokenExpiration } from './hooks/useTokenExpiration';

import './styles/main.scss';
import Login from './pages/login';
import Register from './pages/register';
import PassowrdReset from './pages/password_reset';
import Home from './pages/home';
import Store from './pages/store';
import Search from './pages/search';
import { ProductDetail } from './pages/product_detail';
import { Payment } from './pages/payment';
import { Post } from './pages/post';
import { Contact } from './pages/contact';
import { User } from './pages/user/user_dashboard';
import { UserChangePassword } from './pages/user/user_change_pass';
import { UserOrders } from './pages/user/user_orders';
import { UserDiposit } from './pages/user/user_diposit';
import PrivateRoute from './PrivateRoute';
import { UserVoucher } from './pages/user/user_voucher';

// localStorage.clear()

function App() {
  useTokenExpiration();
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/password_reset' element={<PassowrdReset />}></Route>

        <Route exact path='/' element={<Home />} />
        <Route exact path='/store' element={<Store />}></Route>
        <Route exact path='/search/:search_name' element={<Search />}></Route>

        <Route exact path='/product/:id' element={<PrivateRoute><ProductDetail /></PrivateRoute>} ></Route>
        <Route exact path='/payment' element={<PrivateRoute><Payment /></PrivateRoute>}></Route>

        <Route exact path='/post/:id' element={<Post />}></Route>
        <Route exact path='/contact' element={<Contact />}></Route>
        
        <Route exact path='/user' element={<PrivateRoute><User /></PrivateRoute>}></Route>
        <Route exact path='/user_change_password' element={<PrivateRoute><UserChangePassword /></PrivateRoute>}></Route>
        <Route exact path='/user_orders' element={<PrivateRoute><UserOrders /></PrivateRoute>}></Route>
        <Route exact path='/user_diposit' element={<PrivateRoute><UserDiposit /></PrivateRoute>}></Route>
        <Route exact path='/user_voucher' element={<PrivateRoute><UserVoucher /></PrivateRoute>}></Route>
      </Routes>
    </Router>
  )
}

export default App
