import { authConstants,adminUserConstants } from './constants'
import axios from '../helpers/axios'

export const login = (data) => {
  console.log(data);

  return async (dispatch)=>{
    dispatch({type: authConstants.LOGIN_REQUEST});
    const res = await axios.post('http://localhost:3000/admin/signin', {
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
          const res = await axios.post(`http://localhost:3000/admin/signout`);

          if(res.status === 200){
              localStorage.clear();
              localStorage.removeItem('data');
              localStorage.removeItem('token');

              dispatch({ type: authConstants.LOGOUT_SUCCESS });
          }else{
              dispatch({
                  type: authConstants.LOGOUT_FAILURE,
                  payload: { error: res.data.error }
              });
          }
      }
  }

  //  Admin user profile updateUserProfile

  // export const updateAdmin = (name,email,phone) => {
  //   return async (dispatch,getState) => {
  //     try{
  //       dispatch({
  //         type:adminUserConstants.USER_UPDATE_REQUEST,
  //       })
  //       const {userInfo} = getState().data;
  //       const config = {
  //         headers:{
  //           'content-Type':'application/json',
  //           authorization:`Bearer ${data.token}`
  //         },
  //       }
  //       const res = await axios.put('/admin/profileUpdate',{
  //         name,
  //         email,
  //         phone,
  //       })
  //       dispatch({
  //         type:adminUserConstants.USER_UPDATE_SUCCESS
  //       })
  //     }catch(error){
  //       dispatch({
  //           type: adminUserConstants.USER_UPDATE_FAILURE,
  //           payload: { error: res.data.error }
  //       });
  //     }
  //     }
  //
  // }
