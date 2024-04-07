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


const App = () => {
  const { access_token } = useSelector(state => state.auth);
  return (
    <>
    <div className='root'>
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={!access_token ? <Login/> : <Home/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/changePassword" element={!access_token ? <h1>404 - Page not Found..!!</h1> : <ChangePassword/>}/>
          <Route exact path="/:subcategory_slug/" element={<ProductList/>} />
          <Route exact path="/:subcategory_slug/:product_slug/" element={<Product/>} />
          <Route path="/cart" element={!access_token ? <Login/> :<Cart/>}/>
          <Route path="/checkout" element={!access_token ? <Login/> :<Checkout/>} />
        </Routes>  
      </Router>
    </div>
    </>
  )
}

export default App