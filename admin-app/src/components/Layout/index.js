import React from 'react'
import Header from '../Header'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import './style.css'
import { FaHome, FaProductHunt, FaUsers, FaFirstOrderAlt } from 'react-icons/fa'
import { BiAddToQueue, BiCategoryAlt } from 'react-icons/bi'
import { AiOutlineFolderView } from 'react-icons/ai'
// import { CiDiscount1 } from 'react-icons/ci'

const Layout = (props) => {
  return (
    <>
      <Header />
      {
        props.sidebar ?
          <Container fluid>
            <Row>
              <Col md={2} className="sidebar">
                <ul>

                  <li><NavLink to={'/'}><FaHome /> Home</NavLink></li>
                  {// <li><NavLink to={'/page'}>Page</NavLink></li>
                  }

                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className='text-black'><FaProductHunt /> Products</span>
                    </a>
                    <ul className="dropdown-menu bg-dark ml-5 dropdown-menu-item" aria-labelledby="navbarDropdownMenuLink">
                      <li><Link className="dropdown-item dropsidebar text-white" to="/addProduct"><BiAddToQueue /> Add Product</Link></li>
                      <li><Link className="dropdown-item text-white" to="/viewProduct"><AiOutlineFolderView /> View Product</Link></li>
                    </ul>
                  </li>
                  {/* <li><Link to={'/products'}>Products</Link></li> */}
                  <li><Link to={'/category'}><BiCategoryAlt /> Category</Link></li>
                  <li><Link to={'/userlist'}><FaUsers /> Users</Link></li>
                  <li><Link to={'/AllCoupons'}> Discount Codes</Link></li>
                  <li><Link to={'/orders'}><FaFirstOrderAlt /> Orders</Link></li>
                  <div>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className='text-black'>Product Vriations</span>
                      </a>
                      <ul className="dropdown-menu bg-dark ml-5 dropdown-menu-item" aria-labelledby="navbarDropdownMenuLink">
                        <li><Link className="dropdown-item dropsidebar text-white" to="/addProductVariation"><BiAddToQueue /> Add Variation</Link></li>
                        <li><Link className="dropdown-item text-white" to="/viewProductVariation"><AiOutlineFolderView /> View Variations</Link></li>
                      </ul>
                    </li>
                  </div>
                </ul>
              </Col>

              <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>{props.children}</Col>
            </Row>
          </Container>

          :
          props.children
      }
    </>
  )
}

export default Layout
