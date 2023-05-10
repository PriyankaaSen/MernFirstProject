import React from 'react'
import loginimage from '../../assets/signin.jpg';
import './style.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useState, useContext} from 'react'

const Login = () => {


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({email, password}),

      Cache: "default",
    });

    const data = res.json();
    console.log(data);
    if(res.status === 400 || !data){
      window.alert("invalid");

    }else{
      window.alert("succefully");
      navigate("/");
    }
  }

    return (
        <>
        <section className="h-100 gradient-form loginsection">
<div className="container py-5 h-100">
  <div className="row d-flex justify-content-center align-items-center h-100" style={{maxWidth:'100%'}}>
    <div className="col-xl-10">
      <div className="card rounded-3 text-black cardcontainer">
        <div className="row g-0" style={{height:'100%'}}>
          <div className="col-lg-6">
            <div className="card-body p-md-5 mx-md-4">

              <div className="text-center">
                <img src={loginimage}
                className="loginlogoimg"   alt="logo"/>

                <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
              </div>

              <form method = "POST">
                <p>Please login to your account</p>

                <div className="form-outline mb-4">
                  <input type="email" id="form2Example11" className="form-control"
                    placeholder="Phone number or email address" onChange={(e) => setEmail(e.target.value)}
                   value={email}  />
                  <label className="form-label" for="form2Example11">Username</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form2Example22" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <label className="form-label" for="form2Example22">Password</label>
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                  <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"
                  onClick={loginUser}>Log in </button>
                  <a className="text-muted" href="#!"> Forgot password?</a>
                </div>

                <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">Don't have an account?</p>
                  <NavLink to="/signup" className="btn btn-outline-danger">Create new</NavLink>

                </div>

              </form>

            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
        </>
    )
}

export default Login