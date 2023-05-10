import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table, Toast } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions";
// import { getCoupons } from "../../actions/couponCode.action";
import axios from "../../helpers/axios";
import Axios from 'axios';

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
    // console.log('yyyyyyy', selectedProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        Axios.get("http://localhost:3000/get-coupon")
        .then((response)=>{
            setCoupons(response.data)
        })
        .catch(()=> {
          console.log("error occur");
        })
      }, [])

    const handleClose = () => {
        setShow(false);
    };

    const submitCouponForm = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:3000/create/couponcode`, {
            name,
            minAmount,
            maxAmount,
            selectedProducts,
            value,
            // productId:product._id
        }).then((res) => {
            Toast.success("coupon code created successfully")
            setShow(false);
        }).catch((error) => {
            Toast.error(error.response.data.message)
        })
    }
    
    const handleShow = () => setShow(true);

    const renderCoupons = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Min. Amount</th>
                        <th>Max. Amount</th>
                        <th>selected Products</th>
                    </tr>
                </thead>
                <tbody>
                {coupons.length > 0
            ? coupons.map((item) => (
                <tr key={item._id}>
                  <td>2</td>
                  <td>{item.name}</td>
                  <td>{item.value + " %"}</td>
                  <td>{item.selectedProducts}</td>
                  <td>{item.minAmount}</td>
                </tr>
              ))
            : null}
                </tbody>
            </Table>
        );
    };
    // add coupons modal

    const renderAddCouponModal = () => {
        return (
            <Modal
                show={show}
                handleclose={handleClose}
                modaltitle={"Add New Coupon"}
                onSubmit={submitCouponForm}
            >
                <Input
                    label="Name"
                    name="name"
                    value={name}
                    placeholder={`Enter Your Coupon Name`}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Discount Percentage"
                    name="value"
                    value={value}
                    placeholder={`Enter Your Coupon Value`}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Input
                    label="Min. Amount"
                    name="value"
                    value={minAmount}
                    placeholder={`Enter Your Coupon code Min Amount`}
                    onChange={(e) => setminAmount(e.target.value)}
                />
                <Input
                    label="Max. Amount"
                    name="value"
                    value={maxAmount}
                    placeholder={`Enter Your Coupon code Max Amount`}
                    onChange={(e) => setmaxAmount(e.target.value)}
                />

                <select
                    className="form-control"
                    value={selectedProducts}
                    onChange={(e) => setselectedProducts(e.target.value)}
                >
                    <option>select Product</option>
                    {product.products.map((option) => (
                        <option key={option.name} value={option._id}>
                            {option.name}
                        </option>
                    ))}
                </select>

            </Modal>
        );
    };

    return (
        <Layout sidebar>
            <Container style={{ marginTop: "20px" }}>
                <Row style={{ marginBottom: "20px" }}>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Coupons</h3>
                            <button className="btn btn-primary" onClick={handleShow}>Create New Coupon</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>{renderCoupons()}</Col>
                </Row>
            </Container>
            {renderAddCouponModal()}
            {/* {renderProductDetailsModal()} */}
        </Layout>
    );
};

export default AllCouponCodes;
