import React, {useEffect, useState} from 'react';
import './style.css';

const Contact = () => {


  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

  const userContact = async () => {
    try{
      const res = await fetch('/getdata', {
        method: "GET",
        headers:{
          "Content-Type":"application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch (err){
      console.log(err);
      // navigate("/login");

    }
  }

  useEffect(() => {
    userContact();
  }, []);
// storing data in states

const handleInputs = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  setUserData({...userData, [name]:value});
}

// send data to backend
const contactForm = async (e) => {
  e.preventDefault();

  const {name, email, phone, message} = userData;

  const res = await fetch('/contact', {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, phone, message}),
    Cache: "default",
  });


const data = await res.json();

if(!data){
  console.log('msg not sent');
}else{
  alert("msg send");
  setUserData({...userData, message:""});
}
}

    return (
        <>
        <div className="contact3 py-5">
<div className="row no-gutters imgrow">
  <div className="container contactcontainer">
    <div className="row">
      <div className="col-lg-6">
        <div className="card-shadow">
          <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg" className="img-fluid" />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="contact-box">
          <h1 className="font-weight-light mt-2">Quick Contact</h1>
          <form className="mt-4" method="POST">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <input className="form-control" type="text" placeholder="name"
                  name="name"
                  value={userData.name}
                  onChange= {handleInputs} />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <input className="form-control" type="email" placeholder="email address"
                  name="email"
                  value={userData.email} onChange= {handleInputs}/>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <input className="form-control" type="text" placeholder="phone"
                  name="phone"
                  value={userData.phone}
                  onChange= {handleInputs}  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <textarea className="form-control" rows="3" placeholder="message"
                  name="message"
                  value={userData.message}
                  onChange= {handleInputs} ></textarea>
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="btn btn-danger-gradiant mt-3 text-white border-0 px-3 py-2"
                onClick={contactForm}><span> SUBMIT</span></button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="card mt-4 border-0 mb-4">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="card-body d-flex align-items-center c-detail pl-0">
                <div className="mr-3 align-self-center">
                  <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png" />
                </div>
                <div className="">
                  <h6 className="font-weight-medium">Address</h6>
                  <p className="">601 Sherwood Ave.
                    San Bernandino  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="card-body d-flex align-items-center c-detail">
                <div className="mr-3 align-self-center">
                  <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png" />
                </div>
                <div className="">
                  <h6 className="font-weight-medium">Phone</h6>
                  <p className="">251 546 9442
                     630 446 8851 </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="card-body d-flex align-items-center c-detail">
                <div className="mr-3 align-self-center">
                  <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png" />
                </div>
                <div className="">
                  <h6 className="font-weight-medium">Email</h6>
                  <p className="">
                    info@wrappixel.com
                     123@wrappixel.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
        </>
    )
};

export default Contact
