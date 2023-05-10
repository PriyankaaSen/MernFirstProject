// import { ADD_TO_CART } from "../actions/cartConstants";
// import { DELETE_FROM_CART } from "../actions/cartConstants";

// const initState = {
// 	cart:[]
// }

// if (localStorage.getItem('cart')) {
// 	initState.cart = JSON.parse(localStorage.getItem('cart'));
// } else {
// 	initState.cart = [];
// }

// export const cartReducer = (state = initState, action) => {
// 	switch (action.type) {
// 		case ADD_TO_CART:
// 			return {
// 				cart: [...action.payload],
// 			};
// 		case DELETE_FROM_CART:
// 			return {
// 				cart: [...action.payload],
// 			};
// 		default:
// 			return state;
// 	}
// };

import { cartConstants } from "../actions/constants";

const initState = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: 'Samsung mobile',
        //     img: 'some.jpg',
        //     price: 200,
        //     qty: 1,
        // }
    },
    updatingCart: false,
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initState
            }
    }
    return state;
}