import axios from "../helpers/axios"


export const getCoupons = ()=>{
    return async (dispatch) => {
            const res = await fetch(`http://localhost:3000/get-coupon`, {
                method: "GET"
            });

            const data = await res.json();
            console.log('oo', data)
    
            if (res.status !==200) {
                console.log("no coupon available")
            }else{
                console.log("getCoupon")
    
            }
    }
}