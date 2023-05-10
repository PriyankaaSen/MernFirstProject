import React, {useReducer, useEffect} from 'react'
// import {Fragment} from 'react';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Products from './containers/Products';
import AddProduct from './containers/Products/addProduct';
import ViewProducts from './containers/Products/viewProduct';
import AddVariation from './containers/ProductVriations/addVariation';
import ViewVariation from './containers/ProductVriations/viewVariation';
import Category from './containers/Category';
import Orders from './containers/Orders';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import AdminProfile from './containers/AdminProfile';
import UpdateUserProfile from './containers/AdminProfile/updateUserProfile'
import Userlist from './containers/AdminProfile/UserList/index.js';
import UserEdit from './containers/AdminProfile/UserList/edit.js';
import UserDetails from './containers/AdminProfile/UserList/userDetails.js';
import AllCouponCodes from './containers/CouponCode/index';
import NewPage from './containers/NewPage';
import Protected from './components/HOC/PrivateRoute'
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import {isUserLoggedIn} from './actions'
import { getAllCategory } from "./actions";
import { getInitialData } from "./actions/initialData.action";
import { getProducts } from "./actions";


const App = () => {

  const dispatch = useDispatch();
const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn)
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate])


  return (
    // <React.Fragment>
    //   <div className="App">
    //     <Routes>
    //       <PrivateRoute path="/" exact component={Home} />
    //
    //       <Route path="/signin" component={Signin} />
    //       <Route path="/signup" component={Signup} />
    //       </Routes>
    //   </div>
    //   </React.Fragment>

      // <Fragment>
        <Routes>


          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/signin' element={<Signin/>}/>
          <Route  path='/' element={<Protected />} >
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/products' element={<Products/>}/>
              <Route exact path='/addProduct' element={<AddProduct/>}/>
              <Route exact path='/viewProduct' element={<ViewProducts/>}/>
              <Route exact path='/addProductVariation' element={<AddVariation/>}/>
              <Route exact path='/viewProductVariation' element={<ViewVariation/>}/>
              <Route exact path='/page' element={<NewPage/>}/>
              <Route exact path='/category' element={<Category/>}/>
              <Route exact path='/userprofile' element={<AdminProfile/>}/>
              <Route exact path='/updateUserProfile' element={<UpdateUserProfile/>}/>
              <Route exact path='/userlist' element={<Userlist/>}/>
              <Route exact path='/edit/:id' element={<UserEdit/>}/>
              <Route exact path='/view/:id' element={<UserDetails/>}/>
              <Route exact path='/AllCoupons' element={<AllCouponCodes/>}/>
              <Route exact path='/orders' element={<Orders/>}/>
          </Route>
        </Routes>
      // </Fragment>
    );
}

export default App
