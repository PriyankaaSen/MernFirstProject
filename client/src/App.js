import React, { createContext, useReducer, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/previousComponents/Navbar';
// import Home from './components/Home';
import About from '../src/components/previousComponents/About';
import Contact from '../src/components/previousComponents/Contact';
import Login from '../src/components/previousComponents/Login';
import Signup from '../src/components/previousComponents/Signup';
// import Logout from './components/Logout';
import ErrorPage from '../src/components/previousComponents/Errorpage';
import HomePage from './containers/HomePage/home';
import ShopPage from './containers/ShopPage';
import ProductListPage from './containers/ProductListPage/productList'
import CheckoutPage from './containers/CheckoutPage'
import ProductDetailsPage from './containers/ProductDetailsPage/index'
import SingleProductPage from './containers/ProductListPage/SingleProductPage/index'
import CartPage from './containers/CartPage/index.js'
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions'
import { updateCart } from './actions/cart.action'
import './actions/product.action'
import DatatablePage from './containers/dummydata'
import Email from './containers/testhome';
import { getAllProducts } from './actions';

const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const product = useSelector((state) => state.getproductsdata);

  useEffect(() => {

    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [auth.authenticate])

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          {
            //  <Route path="/" element={<Home />} />
          }
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account/orders" element={<OrderPage />} />
          <Route path="/order_details/:orderId" element={<OrderDetailsPage />} />
          <Route path="/:productSlug/:productId/p" element={<ProductDetailsPage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/:slug" element={<ProductListPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="" element={<ErrorPage />} />
          <Route path="/dummydata" element={<DatatablePage />} />
          <Route path="/listpage" element={<Email />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>

      </div>
    </>
  )
}

export default App
