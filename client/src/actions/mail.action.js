import axios from "../helpers/axios";
import { mailConstants } from "./constants";


//  export const sendemail = (maildata) => {
//     console.log('data',maildata)
// 	return async (dispatch) => {
// 	  try {
// 		const mail = await axios.get(`http://localhost:3000/sendmail`);
//             console.log('email after', mail)
// 	  } catch (error) {
// 		console.log(error);
// 	  }
// 	};
//   };

export const sendemail = (trn_id) => {
    return async (dispatch) => {
      try {
        const res = await axios.get(`http://localhost:3000/sendmail`);
        dispatch({ type: mailConstants.GET_MAIL_REQUEST });
        if (res.status == 200) {
          console.log('payment success',res,trn_id);
          dispatch({
            type: mailConstants.GET_MAIL_SUCCESS,
          });
         
        } else {
          const { error } = res.data;
          dispatch({
            type: mailConstants.GET_MAIL_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };


// const submitEmail = async (e) => {
//     e.preventDefault();
//     console.log({  });
//     const response = await fetch("http://localhost:3000/sendmail", {
//     console.log('kkkk',response);
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({}),
//     })
//       .then((res) => res.json())
//   };