import axios from "../helpers/axios";
import { categoryConstansts } from "./constants";

 const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`/category/getCategory`);
        console.log(res);
        if (res.status === 200) {

            const { categoryList } = res.data;

            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}

export const addCategory = (form) => {
  console.log('ddd',form);
    return async dispatch => {
        dispatch({ type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST });
        try {
            const res = await axios.post(`http://localhost:3000/category/create`, form);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                });
            } else {
                dispatch({
                    type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                });
            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
      dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_REQUEST });
        try {
            const res = await axios.post(`http://localhost:3000/category/update`, form);
            if (res.status === 201) {
              dispatch({ type: categoryConstansts.UPDATE_CATEGORIES_SUCCESS });
              dispatch(getAllCategory())
            } else {
              const {error} = res.data;
              dispatch({
                type: categoryConstansts.UPDATE_CATEGORIES_FAILURE,
                payload: {error}
             });

            }
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
      dispatch({ type: categoryConstansts.DELETE_CATEGORIES_REQUEST });
        try {
            const res = await axios.post(`http://localhost:3000/category/delete`, {
              payload:{
                ids
              }
            });
            if(res.status === 201){
              dispatch(getAllCategory());
              dispatch({ type: categoryConstansts.DELETE_CATEGORIES_SUCCESS });
            }else{
              const {error} = res.data;
              dispatch({
              type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
              payload: {error}
             });

            }
        } catch (error) {

        }
    }
}

export {
  getAllCategory
}
