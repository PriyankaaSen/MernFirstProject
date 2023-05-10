import { authConstants,cartConstants } from './constants'
import axios from '../helpers/axios'

// new update signup action
export const signup = (data) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      res = await axios.post(`/register`, data);
      if (res.status === 201) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS });
        const { token, data } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("data", JSON.stringify(data));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            data,
          },
        });
      } else {
        const { error } = res.data;
        dispatch({ type: authConstants.SIGNUP_FAILURE, payload: { error } });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: data.error },
      });
    }
  };
};


export const login = (data) => {
  console.log(data);

  return async (dispatch)=>{
    dispatch({type: authConstants.LOGIN_REQUEST});
    const res = await axios.post('/signin', {
        ...data
    });


    if(res.status === 200){
      const {token, data} = res.data;
      localStorage.setItem('token', token)
      localStorage.setItem('data', JSON.stringify(data))

      dispatch({
        type:authConstants.LOGIN_SUCCESS,
        payload: {
          token, data
        }
      });
    }else{
      if(res.status === 400){
        dispatch({
          type:authConstants.LOGIN_FAILURE,
          payload:{error: res.data.error}
        })
      }
    }
}
}

 export const isUserLoggedIn = () => {
  return async dispatch => {
    const token = localStorage.getItem('token');
    if(token){
      const data = JSON.parse(localStorage.getItem('data'))
      dispatch({
        type:authConstants.LOGIN_SUCCESS,
        payload: {
          token, data
        }
      });
    }else{
      dispatch({
        type:authConstants.LOGIN_FAILURE,
        payload:{error: 'failed to login'}
      })
    }
    }
  }

  export const signout = () => {
      return async dispatch => {

          dispatch({ type: authConstants.LOGOUT_REQUEST });
          // const res = await axios.post(`/admin/signout`);

          // if(res.status === 200){
              localStorage.clear();
              // localStorage.removeItem('data');
              // localStorage.removeItem('token');

              dispatch({ type: authConstants.LOGOUT_SUCCESS });
              dispatch({ type: cartConstants.RESET_CART });
          // }else{
              // dispatch({
              //     type: authConstants.LOGOUT_FAILURE,
              //     payload: { error: res.data.error }
              // });
          }


      }
  // }
