import React from 'react';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ChangePassword from './pages/ChangePassword';
import SearchResults from './pages/SearchResults';
import Payment from './pages/Payment';
import MyOrders from './pages/MyOrders';
import "./App.css"
import Invoice from './pages/Invoice';
import ScrollToTop from './components/ScrollToTop';
import Admin from './pages/Admin';
import TotalSales from './components/admin/TotalSales';
import Customers from './components/admin/Customers';
import ProductsReport from './components/admin/ProductsReport';
import AdminLogin from './pages/AdminLogin';
import ContactUs from './pages/ContactUs';



const App = () => {
  const { access_token } = useSelector(state => state.auth);
  const admin_email = localStorage.getItem('admin')
  // console.log(admin_email)
  return (
    <>
    <div className='root'>
    <Router>
      <ScrollToTop/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={!access_token ? <Login/> : <Home/>}/>
          <Route path="/register" element={!access_token ? <Register/> : <Home/>}/>
          <Route path="/search/" element={<ProductList/>} />
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/changePassword" element={!access_token ? <h1>404 - Page not Found..!!</h1> : <ChangePassword/>}/>
          <Route exact path="/:subcategory_slug/" element={<ProductList/>} />
          <Route exact path="/:subcategory_slug/:product_slug/" element={<Product/>} />
          <Route path="/cart" element={!access_token ? <Login/> :<Cart/>}/>
          <Route path="/checkout" element={!access_token ? <Login/> :<Checkout/>} />
          <Route path="/payment" element={!access_token ? <Login/> :<Payment/>} />
          <Route path="/myOrders" element={!access_token ? <Login/> :<MyOrders/>} />
          <Route path="/orderInvoice" element={!access_token ? <Login/> :<Invoice/>} />
          <Route path="/admin-login" element={!access_token && admin_email !== "admin@skfashion.com" ? <AdminLogin/> : <Admin/>}/>
          <Route path="/admin-dashboard" element={!access_token ? <AdminLogin/> : <Admin />}/>
          <Route path="/admin/totalSales" element={!access_token ? <AdminLogin/> : <TotalSales />}/>
          <Route path="/admin/customers" element={!access_token ? <AdminLogin/> : <Customers/>}/>
          <Route path="/admin/products" element={!access_token ? <AdminLogin/> : <ProductsReport/>}/>

        </Routes>  

      </Router>
    </div>
    </>
  )
}

export default App