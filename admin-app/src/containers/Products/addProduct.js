import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById, getProducts } from "../../actions";
import { generatePublicUrl } from '../../urlConfig'
import "./style.css";
import { TwitterPicker } from 'react-color'
import { v4 as uuidv4 } from 'uuid';
import AddingPagination from "../Pagination";

const AddProducts = (props) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    // const [colors, setColors] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
    };

    const submitProductForm = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);
        for (let pic of productPictures) {
            form.append("productPictures", pic);
        }

        dispatch(addProduct(form)).then(() => setShow(false));
    };
    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    };

    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
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
                    <div className="card-header">Add New Product</div>
                    <div className="card-body">
                        <Row>
                            <form onSubmit={submitProductForm} >
                                <div className="form-group">
                                    <Input
                                        label="Name"
                                        value={name}
                                        placeholder={`Product Name`}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <Input
                                    label="Quantity"
                                    value={quantity}
                                    placeholder={`Quantity`}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                <Input
                                    label="Price"
                                    value={price}
                                    placeholder={`Price`}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <Input
                                    label="Description"
                                    value={description}
                                    placeholder={`Description`}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="form-group mt-2">

                                    <select
                                        className="form-control"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                    >
                                        <option>select category</option>
                                        {createCategoryList(category.categories).map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {productPictures.length > 0
                                    ? productPictures.map((pic, index) => (
                                        <div key={index}>{pic.name}</div>
                                    ))
                                    : null}
                                <div className="form-group mt-2">
                                    <input type="file" name="productPictures" className="form-control-file" onChange={handleProductPictures} ></input>
                                </div>
                                <button type="submit" value="Submit" className="btn btn-primary mt-2" >Submit</button>
                                <hr className="hr" />
                                {/* <div className="card">
                                    <div className="row">
                                        <div className="col col-md-3">
                                            <h5 className="card-header">Product data --</h5>
                                        </div>
                                        <div className="col col-md-3 pt-1">
                                            <select className="form-select" aria-label="Default select example">
                                                <option defaultValue >Simple Product</option>
                                                <option value="1">Simple Product</option>
                                                <option value="2">Grouped Product</option>
                                                <option value="3">Variable Product</option>
                                            </select>
                                        </div>
                                        <div className="col col-md-2 pt-2">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    virtual
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col col-md-2 pt-2">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Downloadable
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                <hr className="hr" />
                                    <div className="row">
                                        <div className="col">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col col-md-3 ">
                                                        <label>Color:</label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option defaultValue>Red</option>
                                                            <option value="1">Blue</option>
                                                            <option value="2">Green</option>
                                                            <option value="3">Grey</option>
                                                        </select>
                                                    </div>
                                                    <div className="col col-md-3">
                                                        <label>Size:</label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option defaultValue>Small</option>
                                                            <option value="1">Small</option>
                                                            <option value="2">Medium</option>
                                                            <option value="3">Large</option>
                                                        </select>
                                                    </div>
                                                    <div className="col col-md-3">
                                                        <label>Weight:</label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option defaultValue>Simple Product</option>
                                                            <option value="1">Simple Product</option>
                                                            <option value="2">Grouped Product</option>
                                                            <option value="3">Variable Product</option>
                                                        </select>
                                                    </div>
                                                        <a href="#" className="btn btn-primary mt-3">Go somewhere</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </form >
                        </Row>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default AddProducts;
