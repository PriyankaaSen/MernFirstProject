import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  addOrder, getAddress} from "../../actions/user.action";
import {getCartItems } from "../../actions/cart.action";
import Layout from "../../components/Layout/layout";
import { mailConstants } from "../../actions/constants";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import CartPage from "../CartPage";
import AddressForm from "./AddressForm";
import {useNavigate} from 'react-router-dom'
import "./style.css";
import axios from "axios";
import {payUsingPaytm} from '../../actions/paytm.action'
import {post} from '../../actions/'
import {sendemail} from '../../actions/mail.action'


const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const cart = useSelector((state) => state.cart); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address.length === 0 && setNewAddress(true);
  }, [user.address]);

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {

      navigate(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId]);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_tuo8axV5YGLUqt",
      amount:(1*100),
      currency:data.currency,
      name:cart.cartItems,
      order_id:data.id,
      handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:3000/verify";
					

					const  data  = await axios.post(verifyUrl, response);
          // console.log('jjjjj', data);
					// console.log('jhihiuij' ,data.status);
          if (data.status == 200) {
            dispatch(sendemail(data.config.data))
            // console.log('hlo nitiiiiiiindfdsdssdssd')
            // return async () => {
            //   	  try {
            //   		const mail = await axios.get(`http://localhost:3000/sendmail`);
            //               console.log('email after', mail)
            //   	  } catch (error) {
            //   		console.log(error);
            //   	  }
            //   	};
          } else {
            
          }
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
    const rzp1 = new window.Razorpay(options);
		rzp1.open();
    }

  
 const handlePayment = async() => {
    try {
      
      const totalAmount = Object.keys(cart.cartItems).reduce(
        (totalPrice, key) => {
          const { price, qty } = cart.cartItems[key];
          return totalPrice + price * qty;
        },
        0
      );
      const items = Object.keys(cart.cartItems).map((key) => ({
        productId: key,
        payablePrice: cart.cartItems[key].price,
        purchasedQty: cart.cartItems[key].qty,
      }));
      const payload = {
        addressId: selectedAddress._id,
        totalAmount,
        items,
        paymentStatus: "pending",
        paymentType: "razorpay",
      };
      const orderUrl = `http://localhost:3000/createorder`;
      const data = await axios.post(orderUrl,{amount:totalAmount})
      console.log('res' ,data);
      initPayment(data.data)
    } catch (error) {
      console.log(error)
    }
 }

 const buyWithPaytm = () => {
    payUsingPaytm({ amount: 500, email: 'priyanka@gmail.com'})
    .then(response=>{
      var information={
        action:"https://securegw-stage.paytm.in/order/process",
        params:response
    }
    post(information)

    })
    
 }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.data.name}</span>
                  <span style={{ margin: "0 5px" }}>{auth.data.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems)?.length} items
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.data.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <input type="radio" name="paymentOption" value="cod" />
                    <div>Cash on delivery</div>
                  </div>
                    <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                  <input type="radio" name="paymentOption" value="cod" />
                    <div>Pay with paytm</div>
                    <MaterialButton
                    title="Paytm"
                    onClick={()=> buyWithPaytm()}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                    <input type="radio" name="paymentOption" value="razorpay" />
                    <div>Pay with RazorPay</div>
                  {/* </div> */}
                  <MaterialButton
                    title="razorpay"
                    onClick={handlePayment}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                </div>
              )
            }
          />
        </div>

        {/* Price Component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;