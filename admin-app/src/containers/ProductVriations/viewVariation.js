import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAttribute } from "../../actions/attribute.action";
import { NavLink, Link } from 'react-router-dom'

const ViewVariation = () => {
  const [attributename, setattributenameName] = useState("");
  const [attributevalue, setattributeValue] = useState("");
  const attributedata = useSelector(state => state.attributes.attributes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttribute())

  }, [dispatch])
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Attribute List</h3>
              <div className="actionBtnContainer">
                {/* <Link className="btn btn-primary" to="/signup" style={{ backgroundColor: "primary" }}><IoIosAdd /> <span>Add User</span></Link> */}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Table style={{ fontSize: 12 }} responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {attributedata.map((items, index) =>
                <tr key={items._id}>
                  <td>{index + 1}</td>
                  <td>{items.attributeName}</td>
                  {/* <td>{items.attributeTerms}</td> */}
                <td>
                  {
                    items.attributeTerms.map((val)=>
                    <div>{val.term} | </div>
                    )
                  }
                </td>
                </tr>
              )}


            </tbody>
          </Table>
        </Row>
      </Container>
    </Layout>
  )
}

export default ViewVariation