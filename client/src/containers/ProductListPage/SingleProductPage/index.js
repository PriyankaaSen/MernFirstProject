import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../../components/Layout/layout'
import { getindividualdata, getProductDetailsById } from "../../../actions/product.action.js";
import './singlepagestyle.css'
import { useSelector, useDispatch } from "react-redux";
import { generatePublicUrl } from '../../../urlConfig'
import { addToCart } from '../../../actions/cart.action.js'
import { BiRupee } from "react-icons/bi";

const SingleProductPage = (props) => {

  const { id } = useParams()
  // console.log('mm', useParams())
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const {addToCart} = props;

  useEffect(() => {

    dispatch(getProductDetailsById(id));
  }, [id]);

  const inddata = useSelector(state => state.product)
  // console.log('dd',inddata)

  const handleGoBackBtn = () => {
    navigate(-1);
  }

  const handleAddToCart = () => {
    const { _id, name, price } = inddata.productDetails;
    const img = inddata.productDetails.productPictures[0].img;
    dispatch(addToCart({ _id, name, price, img }))
    // dispatch(addToCart(inddata));
    navigate('/cart');

  }
  if (Object.keys(inddata.productDetails).length === 0) {
    return null;
  }

  return (
    <>
      <Layout>
        <div className="product-page m-4">
          <button className="btn btn-light text-primary" onClick={handleGoBackBtn}> Go Back </button>
        </div>
        <div className="container">
          <div className="card productdetailcard">
            <div className="container-fliud">

              {inddata && (

                <div className="wrapper row">
                  <div className="preview col-md-6">

                    <div className="preview-pic tab-content">
                      <div className="tab-pane active" id="pic-1">
                        <img src={`http://localhost:3000/public/${inddata.productDetails.productPictures[0].img}`} alt="" />
                      </div>
                    </div>
                    <div className="row imagesss">
                      <div className="col ">
                    <ul className="preview-thumbnail nav nav-tabs">
                      
                      {
                        inddata.productDetails.productPictures.map((thumb, index) =>
                          <div className="active" data-target="#pic-1" data-toggle="tab">
                            <img src={`http://localhost:3000/public/${thumb.img}`} alt="" />
                          </div>
                        )
                      }
                    </ul>
                    </div>
                    </div>
                  </div>
                  <div className="details col-md-6">
                    <h3 className="product-title">{inddata.productDetails.name}</h3>
                    <div className="rating">
                      <div className="stars">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </div>
                      <span className="review-no">41 reviews</span>
                    </div>
                    <p className="product-description"><span>Description:</span> {inddata.productDetails.description}</p>
                    <h5 className="price">Price: <span><BiRupee />{inddata.productDetails.price}</span></h5>
                    <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                    <h5 className="sizes">sizes:
                      <span className="size" data-toggle="tooltip" title="small">s</span>
                      <span className="size" data-toggle="tooltip" title="medium">m</span>
                      <span className="size" data-toggle="tooltip" title="large">l</span>
                      <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                    </h5>
                    {/* <h5 className="colors">colors:
                      <span className="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                      <span className="color green"></span>
                      <span className="color blue"></span>
                    </h5> */}
                    <p className="text-muted border-top py-2">
                      Status: {inddata.productDetails.quantity <= 0 ? 'Out of Stock' : 'In Stock'}
                    </p>
                    <div className="action">
                      <button className="add-to-cart btn btn-default"
                        style={{ marginRight: "5px" }}
                        type="button"
                        disabled={inddata.productDetails.quantity <= 0}
                        onClick={handleAddToCart}
                      >
                        add to cart
                      </button>
                      <button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default SingleProductPage;
