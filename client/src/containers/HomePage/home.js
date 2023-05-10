import React, { useEffect, useState } from 'react'
import Axios from "../../helpers/axios"
import Layout from '../../components/Layout/layout'
import MenuHeader from '../../components/MenuHeader/menuheader'
import { generatePublicUrl } from '../../urlConfig'
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/product.action.js";
import "./listpage.css";
import { NavLink } from 'react-router-dom'
import { BiRupee } from "react-icons/bi";
import Banner from './Banner'
import Slide from './Slide'
import MidSlide from './MidSlide'
import { Box, styled } from '@mui/material'

const Component = styled(Box)`
padding: 10px 10px;
background: #f2f2f2;
`
const HomePage = (props) => {

  const product = useSelector((state) => state.getproductsdata);
  const [text, setText] = useState("")
  const [liopen, setLiopen] = useState(true)
  const proarr = [product.products.findAllProduct]
  // console.log('ppp00000', product.products.findAllProduct);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const getText = (iteams) => {
    setText(iteams)
    setLiopen(false)
  }

  return (
    <>
      < Layout>
        <Component>
          <Banner />
          <MidSlide product={product} title="Deal of the Day" timer={true} />
          <Slide product={product} title="Best of Electronics" timer={false} />
          <Slide product={product} title="Beauty, Food, Toys & more" timer={false} />
          <Slide product={product} title="Sports, Healthcare & more" timer={false} />

        </Component>
        {/* <div className="card" >
          <div className="cardHeader" >
            <div >All Products </div>
          </div>
          <div class="main-search-input-wrap">
            <div class="main-search-input fl-wrap">
              <div class="main-search-input-item">
                <input type="text" name='search' placeholder="Search Products..." onChange={(e) => setText(e.target.value)} />
              </div>
              <button class="main-search-button">Search</button>
            </div>
          </div>
          <div className="row list">

            {
              product.products.findAllProduct?.filter(product => product.name.toLowerCase().includes(text)).map(items => (
                <>
                  <div className="col col-lg-3 col-md-3 col-sm-12 d-flex flex-column align-items-center justify-content-center product-item my-3">
                    <NavLink className="text-decoration-none" to={`/product/${items._id}`}>
                      <div className="productContainer" style={{ backgroundColor: "#e0fbfc" }}>
                        <div className="productImgContainer" style={{ paddingTop: "30px" }}>
                          {
                            items.productPictures.map((pik) =>
                              // {`http://localhost:3000/public/${pik.img}`}
                              <img src={`http://localhost:3000/public/${pik.img}`} alt="" />
                            )

                          }
                        </div>
                        <div className="productInfo">
                          <div className='titleproduct' style={{ color: "black" }}><h6>{items.name}</h6></div>
                          <div>
                            <span style={{ color: "black" }}>4.3</span>
                            <span style={{ color: "black" }}>33.33</span>
                          </div>
                          <div className="productPrice"><BiRupee />{items.price}</div>
                          <p className="text-muted border-top py-2">
                            {items.quantity <= 0 ? 'Out of Stock' : 'In Stock'}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </>
              ))
            }
          </div>
        </div> */}
      </Layout>
    </>
  )
}

export default HomePage
