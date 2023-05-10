import React from 'react'
import Header from '../Header'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import { FaHome } from 'react-icons/fa'

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
                  <li><NavLink to={'/'}>Home</NavLink></li>
                  {// <li><NavLink to={'/page'}>Page</NavLink></li>
                  }
                  <li><NavLink to={'/products'}>Products</NavLink></li>
                  <li><NavLink to={'/category'}>Category</NavLink></li>
                  <li><NavLink to={'/userlist'}>Users</NavLink></li>
                  <li><NavLink to={'/AllCoupons'}>Discount Codes</NavLink></li>
                  <li><NavLink to={'/orders'}>Orders</NavLink></li>
                </ul>
              </Col>

              <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>{props.children}</Col>
            </Row>
          </Container>

          :
          props.children
      }
      {/* <div>
            <h1 style={{ color: 'green' }}>
                GeeksforGeeks</h1>
            <h3>React Suite Dropdown Submenu</h3>
            <Dropdown title="GeeksforGeeks">
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Menu title="Item 2">
                    <Dropdown.Item>Item 2A</Dropdown.Item>
                    <Dropdown.Item>Item 2B</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Item>Item 3</Dropdown.Item>
                <Dropdown.Menu title="Item 4">
                    <Dropdown.Menu title="Item 4A">
                        <Dropdown.Item>Item 4A-A</Dropdown.Item>
                        <Dropdown.Item>Item 4A-B</Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Item>Item 4B</Dropdown.Item>
                </Dropdown.Menu>
  
            </Dropdown>
        </div> */}
    </>
  )
}

export default Layout
