import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import Layout from '../../../components/Layout/layout'
import {getindividualdata,getProductDetailsById } from "../../../actions/product.action.js";
import './style.css'
import { useSelector, useDispatch } from "react-redux";
import { generatePublicUrl } from '../../../urlConfig'
const SingleProductPage = (props) => {

  const {id} = useParams()
  const individualdata = useSelector((state) => state.product);
  console.log('aa',individualdata.productDetails)
  const dispatch=useDispatch()

 useEffect(() => {
const getindividualdata = async(id)=>{
        const res = await fetch(`http://localhost:3000/product/${id}`, {
            method: "GET"
        });
        const data = await res.json();
        console.log('oo', data)

        if (res.status !==200) {
            console.log("no data available")
        }else{
            console.log("getdata")

        }
}



    dispatch(getProductDetailsById(id));
  }, []);


  
  
  
  return (
    <>
      <Layout>
          <div></div>
      </Layout>
    </>
     )
   }
export default SingleProductPage;


<Layout>
          <div>
             <h3>product details</h3>
             {inddata && (
                <div className="row">
                   <div className="col-md-6">
                      <img src={`http://localhost:3000/public/${inddata.productDetails.img}`} />
                    </div>
                  <div className="col-md-5"><h4>{inddata.productDetails.name}</h4></div>
                </div>

              ) }
          </div>
      </Layout>