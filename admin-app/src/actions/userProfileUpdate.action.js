import axios from '../helpers/axios'
import {adminUserConstants} from './constants'

export const userupdateinfo = (updateUserData,id) => {
  return async (dispatch)=>{
    dispatch({
      type:adminUserConstants.USER_UPDATE_REQUEST
    });
    const updateProfileRes = await axios.put(`http://localhost:3000/admin/profileUpdate/${id}`, {
        method: "PATCH",
        headers:{
          "Content-Type" : "application/json",
        },
        body:JSON.stringify({
          name: updateUserData.name,
          email: updateUserData.email,
          phone: updateUserData.phone
        }),
        ...updateUserData
      });
      const updateProfileResData = await updateProfileRes.json();
      if (updateProfileRes.status === 200 ) {
        dispatch({
          type:adminUserConstants.USER_UPDATE_SUCCESS,
          payload:{
            message:updateProfileResData.message
          }
        })
      }else {
        dispatch({
          type:adminUserConstants.USER_UPDATE_FAILURE,
          payload:{
            error:updateProfileResData.error,
          }
        })
      }

  }
}

