import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../../components/UI/Input'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addAttribute } from '../../actions';
import axios from "../../helpers/axios";


const AddVariation = () => {
    const [attributeName, setAttributeName] = useState("");
    const [terms, setTerms] = useState();
    // const attributeTerms = [
    //     ...terms 
    // ]
    console.log(terms);
    
    // const attributedata = useSelector(state => state.attributes.attributes);

    const dispatch = useDispatch();

  
    const submitAttributeForm = () => {
        // e.preventDefault();

        axios.post('http://localhost:3000/addAttribute', {
            attributeName,
            terms
        })
        // const form = new FormData();
        // form.append("attributeName", attributeName);
        // form.append("terms", terms);

        // dispatch(addAttribute(form)).then(() => setShow(false));
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            {/* <h3>Add Products</h3> */}
                            {/* <button className="btn btn-primary" onClick={handleShow}>Add</button> */}
                        </div>
                    </Col>
                </Row>
                <div className="card text-black bg-light justify-content-center mx-auto mt-3" style={{ maxWidth: '100%' }}>
                    <div className="card-header">Add New Attribute</div>
                    <div className="card-body">
                        <Row>
                            <form onSubmit={submitAttributeForm} >
                                <div className="form-group">
                                    <Input
                                        label="Name"
                                        value={attributeName}
                                        placeholder={`Attribute Name`}
                                        onChange={(e) => setAttributeName(e.target.value)}
                                    />
                                </div>
                                <Input
                                    label="Value"
                                    placeholder={`Attribute Value`}
                                    onChange={(e) => setTerms(e.target.value)}
                                />
                                <button type="submit" value="Submit" className="btn btn-primary mt-2" >Submit</button>
                                <hr className="hr" />
                            </form >
                        </Row>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export default AddVariation