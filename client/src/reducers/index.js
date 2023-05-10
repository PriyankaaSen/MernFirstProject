import categoryReducer from './category.reducers'
import productReducer from './product.reducers'
import authReducer from './auth.reducers'
import {getProductsreducer} from './product.reducers'
import cartReducer from './cart.reducers.js'
import useReducer from './user.reducers';
import {combineReducers} from 'redux'


const rootReducer = combineReducers({
	getproductsdata : getProductsreducer,
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart:cartReducer,
  user: useReducer
})

export default rootReducer;
