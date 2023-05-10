import React,{useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const callAboutPage = async () => {
    try{
      const res = await fetch('/about', {
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    }catch (err){
      console.log(err);
      navigate("/login");

    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

    return (
        <div>

          <p>Welcome</p>
          <h1>we are MERN developer</h1>
        </div>
    )
}

export default About
