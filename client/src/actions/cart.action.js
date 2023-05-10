// import { ADD_TO_CART, DELETE_FROM_CART } from './cartConstants';

// export const addToCart = product => async dispatch => {
// 	// if cart already exists in local storage, use it, otherwise set to empty array
// 	const cart = localStorage.getItem('cart')
// 		? JSON.parse(localStorage.getItem('cart'))
// 		: [];
// 		console.log('ggggg',cart)

// 	// check if duplicates
// 	const duplicates = cart.filter(cartItem => cartItem._id === product._id);

// 	// if no duplicates, proceed
// 	if (duplicates.length === 0) {
// 		// prep product data
// 		const productToAdd = {
// 			...product,
// 			count: 1,
// 		};

// 		// add product data to cart
// 		cart.push(productToAdd);

// 		// add cart to local storage
// 		localStorage.setItem('cart', JSON.stringify(cart));

// 		// add cart to redux
// 		dispatch({
// 			type: ADD_TO_CART,
// 			payload: cart,
// 		});
// 	}
// };

// export const deleteFromCart = product => async dispatch => {
// 	const cart = localStorage.getItem('cart')
// 		? JSON.parse(localStorage.getItem('cart'))
// 		: [];

// 	const updatedCart = cart.filter(cartItem => cartItem._id !== product._id);

// 	localStorage.setItem('cart', JSON.stringify(updatedCart));

// 	dispatch({
// 		type: DELETE_FROM_CART,
// 		payload: updatedCart,
// 	});
// };


import axios from "../helpers/axios";
import { cartConstants } from "./constants";
import store from "../store";



const getCartItems = () => {
	return async (dispatch) => {
	  try {
		dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
		const res = await axios.post(`/user/getCartItems`);
		if (res.status === 200) {
		  const { cartItems } = res.data;
		  console.log({ getCartItems: cartItems });
		  if (cartItems) {
			dispatch({
			  type: cartConstants.ADD_TO_CART_SUCCESS,
			  payload: { cartItems },
			});
		  }
		}
	  } catch (error) {
		console.log(error);
	  }
	};
  };

  export const addToCart = (product, newQty = 1) => {
	return async (dispatch) => {
	  const {
		cart: { cartItems },
		auth,
	  } = store.getState();
	  //console.log('action::products', products);
	  //const product = action.payload.product;
	  //const products = state.products;
	  const qty = cartItems[product._id]
		? parseInt(cartItems[product._id].qty + newQty)
		: 1;
	  cartItems[product._id] = {
		...product,
		qty,
	  };
  
	  if (auth.authenticate) {
		dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
		const payload = {
		  cartItems: [
			{
			  product: product._id,
			  quantity: qty,
			},
		  ],
		};
		console.log('jgfdesawqw',cartItems);
		const res = await axios.post(`http://localhost:3000/user/cart/addtocart`, payload);
		console.log('hiiiiiii',res);
		if (res.status === 201) {
		  dispatch(getCartItems());
		}
	  } else {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	  }
  
	  console.log("addToCart::", cartItems);
  
	  dispatch({
		type: cartConstants.ADD_TO_CART_SUCCESS,
		payload: { cartItems },
	  });
	};
  };
  

  export const updateCart = () => {
	return async (dispatch) => {
	  const { auth } = store.getState();
	  let cartItems = localStorage.getItem("cart")
		? JSON.parse(localStorage.getItem("cart"))
		: null;
  
	  console.log("upppppppppp");
  
	  if (auth.authenticate) {
		localStorage.removeItem("cart");
		//dispatch(getCartItems());
		if (cartItems) {
		  const payload = {
			cartItems: Object.keys(cartItems).map((key, index) => {
			  return {
				quantity: cartItems[key].qty,
				product: cartItems[key]._id,
			  };
			}),
		  };
		  if (Object.keys(cartItems).length > 0) {
			const res = await axios.post(`/user/cart/addtocart`, payload);
			if (res.status === 201) {
			  dispatch(getCartItems());
			}
		  }
		} else {
		  dispatch(getCartItems());
		}
	  } else {
		if (cartItems) {
		  dispatch({
			type: cartConstants.ADD_TO_CART_SUCCESS,
			payload: { cartItems },
		  });
		}
	  }
	};
  };
  
  export const removeCartItem = (payload) => {
	return async (dispatch) => {
	  try {
		dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
		const res = await axios.post(`/user/cart/removeItem`, { payload });
		if (res.status === 202) {
		  dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
		  dispatch(getCartItems());
		} else {
		  const { error } = res.data;
		  dispatch({
			type: cartConstants.REMOVE_CART_ITEM_FAILURE,
			payload: { error },
		  });
		}
	  } catch (error) {
		console.log(error);
	  }
	};
  };
  
  export { getCartItems };