import React,{useState} from 'react'
import Signupimage from "../../assets/signup.jpg";
import './style.css';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Signup = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();


  async function signUp(e) {
      e.preventDefault();
      let user = {name, email, phone, password, cpassword} ;

      let result = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({name, email, phone, password, cpassword}),
        Cache: "default",
      });
    const  result1 = await result.json();
      // console.log(result.response+":"+result.status);

      if(result.status===500||!result1)
      {
        toast("not registered");
      }else
      {
        toast("succefully registered");
        navigate("/Login");

      }
      // localStorage.setItem("user-info",JSON.stringify(result));

    }



    return (
        <>
        <section className="vh-100">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black signcard">
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form method="POST" className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control"
                      onChange={(e) => setName(e.target.value)}
                          value={name} autoComplete="off" />
                      <label className="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                     value={email} />
                      <label className="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="phone" id="form3Example3c" className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone} />
                      <label className="form-label" for="form3Example3c">Your Phone</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                     value={password}/>
                      <label className="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control"
                      onChange={(e) => setCpassword(e.target.value)}
                     value={cpassword} />
                      <label className="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5 ml-50">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg" value="register" onClick={signUp}>Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src={Signupimage}
                  className="img-fluid" alt="Sample image"/>
                  <div >
                    <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<ToastContainer />
        </>
    )
}

export default Signup
