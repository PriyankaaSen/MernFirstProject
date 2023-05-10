import React from 'react'
  import {Outlet, Navigate} from 'react-router-dom'
  import {useSelector} from 'react-redux'


const Protected = () => {
  const auth = useSelector(state=>state.auth);
  console.log("statedata",auth);
  const token = localStorage.getItem("token");
    return (
      token ? <Outlet /> : <Navigate to="/signin" />
    )
}

export default Protected
