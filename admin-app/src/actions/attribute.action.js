import axios from "../helpers/axios";
import { attributeConstants } from "./constants";


export const addAttribute = (form) => {
    return async (dispatch) => {
      try {
        dispatch({ type: attributeConstants.ADD_ATTRIBUTE_REQUEST });
        const res = await axios.post(`http://localhost:3000/addAttribute`, form);
        console.log('eeee',res);
        if (res.status === 200) {
          dispatch({ type: attributeConstants.ADD_ATTRIBUTE_SUCCESS });
          dispatch(getAttribute());
        } else {
          dispatch({ type: attributeConstants.ADD_ATTRIBUTE_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  

  export const getAttribute = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: attributeConstants.GET_ALL_ATTRIBUTE_REQUEST });
        const res = await axios.get(`http://localhost:3000/allAttribute`);
        if (res.status === 200) {
          const { findAllAttribute } = res.data;
          dispatch({
            type: attributeConstants.GET_ALL_ATTRIBUTE_SUCCESS,
            payload: { 
                attributes : findAllAttribute
            },
          });
        } else {
          dispatch({ type: attributeConstants.GET_ALL_ATTRIBUTE_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };