import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, Link } from 'react-router-dom'
import Layout from "../../../components/Layout";
import { Container, Row, Col } from 'react-bootstrap';
import { IoIosAdd, IoIosEye, IoIosTrash, IoIosCloudUpload } from 'react-icons/io'
import './style.css'
import Axios from 'axios';
// import { MDBDataTable } from 'mdbreact';
import AddingPagination from '../../Pagination';

const Userlist = (props) => {
  //
  //   const [getuserdata, setUserdata] = useState([]);
  //   console.log(getuserdata);
  //
  //   const getuserdetail = async () => {
  //
  //         const res = await fetch("http://localhost:3000/userdetail", {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json"
  //             }
  //         });
  //
  //         const data = await res.json();
  //         console.log(data);
  //
  //         if (res.status === 422 || !data) {
  //             console.log("error ");
  //
  //         } else {
  //             setUserdata(data.data)
  //             console.log("get data");
  //
  //         }
  //     }
  //
  // useEffect(() => {
  //     getuserdetail()
  // }, [])

  const [name, setName] = useState("")
  const [email, setEmail] = useState(0);
  const [listOfUsers, setListOfUsers] = useState([])

  const updateUser = (id) => {
    const newName = prompt("enter the new name:")
    const newEmail = prompt("enter new email:")

    Axios.put("http://localhost:3000/user/updateUser", { newName: newName, newEmail: newEmail, id: id })
      .then(() => {
        setListOfUsers(
          listOfUsers.map((val) => {
            return val._id == id
              ? { _id: id, name: newName, email: newEmail, phone: val.phone }
              : val;
          })
        )
      })
  }

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3000/user/userDelete/${id}`)
      .then(() => {
        setListOfUsers(
          listOfUsers.filter((val) => {
            return val.Id !== id;
          })
        )
      })
  }

  useEffect(() => {
    Axios.get("http://localhost:3000/user/userList")
      .then((response) => {
        setListOfUsers(response.data)
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
              <h3>User List</h3>
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
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listOfUsers.map((val) => {
                return (
                  <tr className="text-center">
                    <th scope="row">{val._id}</th>
                    <td >{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.phone}</td>
                    <td style={{ marginRight: '5px' }}>
                      <button className="btn btn-success" style={{ marginRight: '5px' }}><IoIosEye /> <span></span></button>
                      <button className="btn btn-info" style={{ marginRight: '5px' }} onClick={() => { updateUser(val._id) }}><IoIosCloudUpload /> <span></span></button>
                      <button className="btn btn-danger" style={{ marginRight: '5px' }} onClick={() => { deleteUser(val._id) }} ><IoIosTrash /> <span></span></button>
                      <button className="btn btn-primary"><span>Active</span></button>
                    </td>

                  </tr>
                )
              })}


            </tbody>
          </table>
        </Row>
      </Container>
      {/* <MDBDataTable
         striped
         bordered
         small
         data={listOfUsers}
        /> */}
      <AddingPagination />
    </Layout>
  )
}

export default Userlist
