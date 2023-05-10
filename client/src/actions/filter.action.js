import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductsByFilter = (arg) => {
    return async dispatch => {
        try {
            const res = await axios.post(`http://localhost:3000/search`, arg);
            // console.log('reasss',res);
            dispatch({
                type: productConstants.SUCCESS_GET_PRODUCTS,
                payload: res.data.products ,
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productConstants.FAIL_GET_PRODUCTS,
                payload: error.res.data.errorMessage ,
            });
        }

    }
}

// export const getProductsByFilter = arg => async dispatch => {
// 	try {
// 		const response = await axios.post('/api/filter/search', arg);

// 		dispatch({
// 			type: GET_PRODUCTS,
// 			payload: response.data.products,
// 		});
// 	} catch (err) {
// 		console.log('getProductsByFilter api error: ', err);
// 		dispatch({ type: STOP_LOADING });
// 		dispatch({
// 			type: SHOW_ERROR_MESSAGE,
// 			payload: err.response.data.errorMessage,
// 		});
// 	}
// };