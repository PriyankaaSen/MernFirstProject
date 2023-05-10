import React from 'react'
import {Link} from 'react-router-dom'
import {  useSelector, useDispatch} from 'react-redux'
import Layout from '../../components/Layout'

const AdminProfile = () => {


  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  console.log('ggg', auth);
    return (
        <>
        <Layout sidebar>
          <div className="container mt-4 mb-4  d-flex justify-content-center">
            <div className="card p-4">
              <div className=" image d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-secondary">
                  <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" />
                </button>
                <span className="name mt-3">{auth.data.name}</span>
                <span className="idd">{auth.data.phone}</span>
                <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                  <span className="idd1">{auth.data.email}</span>
                  <span><i className="fa fa-copy"></i></span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                  <span className="number">role<span className="follow"> {auth.data.role}</span></span>
                </div>
                <div className=" d-flex mt-2">
                  <Link className="btn1 btn-dark" to="/updateUserProfile">Update Profile</Link>
                </div>

                <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                  <span><i className="fa fa-twitter"></i></span>
                  <span><i className="fa fa-facebook-f"></i></span>
                  <span><i className="fa fa-instagram"></i></span>
                  <span><i className="fa fa-linkedin"></i></span>
                </div> <div className=" px-2 rounded mt-4 date ">
                <span className="join">Joined May,2021</span>
              </div>
            </div>
          </div>
        </div>
        </Layout>
        </>
    )
}

export default AdminProfile
