import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getAllProducts = () => {
  return async (dispatch) => {
    // try {
    //   dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
    //   const res = await axios.get("http://localhost:3000/allproduct");

    //   console.log('fdjfkj',res);
    //   if (res.status === 200) {
    //     const { products } = res.data;
    //     console.log('poopop', res.data)
    //     dispatch({
    //       type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
    //       payload: { products }
    //     });
    //   } else {
    //     dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    try{
        const data = await fetch("http://localhost:3000/allproduct", {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        });
        const res = await data.json();
        
        dispatch({type:"SUCCESS_GET_PRODUCTS", payload:res})
    }catch(error){
        dispatch({type:"FAIL_GET_PRODUCTS", payload: error.response})
    }
  };
};

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`http://localhost:3000/products${slug}`);
        //   console.log('product daata', res);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: {
                  products: res.data
                }
            });
        }
    }
}

export const getProductPage = (payload) => {
    console.log('www', payload)
    return async dispatch => {
        try {
            const { cid} = payload.params;
            const res = await axios.get(`http://localhost:3000/page/${cid}`);
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                });
            }
        } catch(error) {
            console.log(error)
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            res = await axios.get(`http://localhost:3000/product/${payload}`);
            // console.log('reasss',res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}

// export const getindividualdata = async(id)=>{
//         const res = await fetch(`http://localhost:3000/product/${id}`, {
//             method: "GET"
//         });
//         const data = await res.json();
//         console.log('oo', data)

//         if (res.status !==200) {
//             console.log("no data available")
//         }else{
//             console.log("getdata")

//         }
// }

