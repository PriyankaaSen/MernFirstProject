import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, Link } from 'react-router-dom'
import Layout from "../../components/Layout";
import { Container, Row, Col } from 'react-bootstrap';
import { IoIosAdd, IoIosEye, IoIosTrash, IoIosCloudUpload } from 'react-icons/io'
import Axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { getProducts } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

const AllCouponCodes = (props) => {

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [coupons, setCoupons] = useState([])
    const [value, setValue] = useState(null);
    const [minAmount, setminAmount] = useState(null);
    const [maxAmount, setmaxAmount] = useState(null);
    const [selectedProducts, setselectedProducts] = useState("");
    const [show, setShow] = useState(false);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();


    useEffect(() => {
        Axios.get("http://localhost:3000/get-coupon")
            .then((response) => {
                setCoupons(response.data)

            })
            .catch(() => {
                console.log("error occur");
            })
    }, [])

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Coupons List</h3>
                            <div className="actionBtnContainer">
                                <Link className="btn btn-primary" to="/signup" style={{ backgroundColor: "primary" }}><IoIosAdd /> <span>Add User</span></Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <table className="table">
                        <thead>
                            <tr className="table-dark text-center">
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Value</th>
                                <th scope="col">Selected Products</th>
                                <th scope="col">Min Amount</th>
                                <th scope="col">Max Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {coupons && coupons.map((val) => {
                                return (
                                    <tr className="text-center">
                                        <th key={name} scope="row">{val._id}</th>
                                        <td >{val.name}</td>
                                        <td>{val.value}</td>
                                        <td>{val.selectedProducts}</td>
                                        <td>{val.minAmount}</td>
                                        <td>{val.maxAmount}</td>
                                    </tr>
                                )
                            })} */}
                            {coupons ? coupons.map((val) => {
                                return (
                                    <div>
                                        <tr className="text-center">
                                            <th key={name} scope="row">{val._id}</th>
                                            <td >{val.name}</td>
                                            <td>{val.value}</td>
                                            <td>{val.selectedProducts}</td>
                                            <td>{val.minAmount}</td>
                                            <td>{val.maxAmount}</td>
                                        </tr>
                                    </div>
                                );
                            }) : <div />}

                        </tbody>
                    </table>
                </Row>
            </Container>
            <MDBDataTable
                striped
                bordered
                small
                data={coupons}
            />
        </Layout>
    )
}

export default AllCouponCodes
